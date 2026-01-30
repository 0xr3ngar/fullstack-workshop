'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type CursorState = 'default' | 'text' | 'interactive'

interface CaretPosition {
    offsetNode: Node
    offset: number
}

interface ExtendedDocument {
    caretPositionFromPoint?: (x: number, y: number) => CaretPosition | null
    caretRangeFromPoint?: (x: number, y: number) => Range | null
}

const INTERACTIVE_SELECTOR = 'button, a, [role="button"], input, textarea, select'
const TEXT_INPUT_SELECTOR = '#slide-editor'

function isOverInteractive(x: number, y: number): boolean {
    const element = document.elementFromPoint(x, y)

    if (element?.closest(TEXT_INPUT_SELECTOR)) return false

    return !!element?.closest(INTERACTIVE_SELECTOR)
}

function isOverTextInTextarea(x: number, y: number): { isOver: boolean; height: number } {
    const element = document.elementFromPoint(x, y)
    const textarea = element?.closest(TEXT_INPUT_SELECTOR) as HTMLTextAreaElement | null

    if (!textarea) return { isOver: false, height: 0 }

    const content = textarea.value
    if (!content.trim()) return { isOver: false, height: 0 }

    const computedStyle = window.getComputedStyle(textarea)
    const lineHeight = parseFloat(computedStyle.lineHeight) || parseFloat(computedStyle.fontSize) * 1.5
    const paddingTop = parseFloat(computedStyle.paddingTop)
    const paddingLeft = parseFloat(computedStyle.paddingLeft)
    const paddingRight = parseFloat(computedStyle.paddingRight)

    const rect = textarea.getBoundingClientRect()
    const relativeX = x - rect.left
    const relativeY = y - rect.top

    // Check if cursor is within the padded content area
    if (relativeX < paddingLeft || relativeX > rect.width - paddingRight) {
        return { isOver: false, height: 0 }
    }

    // Calculate which line the cursor is on
    const lineIndex = Math.floor((relativeY - paddingTop) / lineHeight)
    const lines = content.split('\n')

    // Check if cursor is on a line that has content
    if (lineIndex < 0 || lineIndex >= lines.length) {
        return { isOver: false, height: 0 }
    }

    const currentLine = lines[lineIndex]
    if (!currentLine.length) return { isOver: false, height: 0 }

    // Estimate character width and check if cursor is within text bounds
    const fontSize = parseFloat(computedStyle.fontSize)
    const charWidth = fontSize * 0.6 // Approximate for monospace
    const lineWidth = currentLine.length * charWidth

    if (relativeX > paddingLeft + lineWidth) {
        return { isOver: false, height: 0 }
    }

    return { isOver: true, height: lineHeight }
}

function getCaretRange(x: number, y: number): Range | null {
    const doc = document as ExtendedDocument

    if (doc.caretPositionFromPoint) {
        const pos = doc.caretPositionFromPoint(x, y)
        if (!pos) return null

        const range = document.createRange()
        range.setStart(pos.offsetNode, pos.offset)
        range.setEnd(pos.offsetNode, pos.offset)
        return range
    }

    return doc.caretRangeFromPoint?.(x, y) ?? null
}

function isPointInRect(x: number, y: number, rect: DOMRect): boolean {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}

function getTextHeight(x: number, y: number): number | null {
    // Skip if we're over the slide editor (handled separately)
    const element = document.elementFromPoint(x, y)
    if (element?.closest(TEXT_INPUT_SELECTOR)) return null

    const range = getCaretRange(x, y)
    if (!range || range.startContainer.nodeType !== Node.TEXT_NODE) return null

    const textNode = range.startContainer
    if (textNode.parentElement?.closest(INTERACTIVE_SELECTOR)) return null

    const textRange = document.createRange()
    textRange.selectNodeContents(textNode)

    if (!isPointInRect(x, y, textRange.getBoundingClientRect())) return null

    const span = document.createElement('span')
    span.textContent = '\u200b'
    range.insertNode(span)
    const height = span.getBoundingClientRect().height
    span.remove()

    return height > 0 ? height : null
}

const SIZES = {
    default: { width: 10, height: 10 },
    interactive: { width: 20, height: 20 },
    text: { width: 2, height: 0 },
}

export default function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [state, setState] = useState<CursorState>('default')
    const [textHeight, setTextHeight] = useState(0)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e
            setPosition({ x, y })

            if (isOverInteractive(x, y)) {
                setState('interactive')
                return
            }

            const textInput = isOverTextInTextarea(x, y)
            if (textInput.isOver) {
                setState('text')
                setTextHeight(textInput.height)
                return
            }

            const height = getTextHeight(x, y)
            if (height) {
                setState('text')
                setTextHeight(height)
                return
            }

            setState('default')
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const size = state === 'text'
        ? { ...SIZES.text, height: textHeight }
        : SIZES[state]

    return (
        <motion.div
            className="fixed pointer-events-none z-[9999]"
            style={{
                left: position.x,
                top: position.y,
                x: '-50%',
                y: '-50%',
                backgroundColor: 'white',
                mixBlendMode: 'difference',
                willChange: 'transform'
            }}
            animate={{
                width: size.width,
                height: size.height,
                borderRadius: state === 'text' ? 0 : '50%',
            }}
            transition={{ type: 'spring', stiffness: 600, damping: 30 }}
        />
    )
}

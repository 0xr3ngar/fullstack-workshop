import { db, PresentationsTable, SlidesTable } from './drizzle'
import { sql } from 'drizzle-orm'

const SLIDES = [
    // Slide 1: Title
    `# Why Rust Sucks & C is Based

## A presentation for real programmers

![Virgin Rust vs Chad C](https://external-preview.redd.it/bf5x78GwzFxNcWtOnkcLDTRRSylAqXjPXwu93dl8ntM.jpg?auto=webp&s=f36a7cff44185f56288ff649028a2de9fc50b61f)`,

    // Slide 2: The Problem with Rust
    `# The Rust "Experience"

> "I just mass borrowed your mother and mutably made her my own."

- Spend 3 hours fighting the borrow checker
- Code finally compiles
- It's a hello world program
- Still somehow uses more memory than C

![Rust transforms you](https://preview.redd.it/ive-seen-a-lot-of-memes-about-c-rust-do-be-like-that-too-v0-7vx28m7qso291.jpg?width=640&crop=smart&auto=webp&s=7452af820a10ce94342d28be0833c41b249a9b7d)`,

    // Slide 3: C Simplicity
    `# C: Simple, Elegant, Based

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

**Compiles instantly. Runs everywhere. No drama.**

Meanwhile Rust developers are still configuring their Cargo.toml...`,

    // Slide 4: Memory Management
    `# Memory Management

![Rust vs C Memory](https://i.imgflip.com/32csyj.jpg)

### Rust: 
*"Yeah, umm, if you could just make sure you're borrowing this memory region correctly, that'd be great"*

### C: 
*"Here's some bytes for you man"*`,

    // Slide 5: Compile Times
    `# Compile Times

## C Compilation:

\`\`\`
$ time gcc main.c -o main
real    0m0.089s
\`\`\`

## Rust Compilation:

\`\`\`
$ time cargo build
Compiling libc v0.2.150
Compiling cfg-if v1.0.0
... 847 more crates ...
real    47m23.847s
\`\`\`

*Rust devs have time to learn C while waiting for builds*`,

    // Slide 6: The Borrow Checker
    `# The Borrow Checker Experience

### What Rust devs say:

> "The borrow checker is your friend!"

### What you actually see:

\`\`\`
error[E0502]: cannot borrow \`x\` as mutable 
because it is also borrowed as immutable
  --> src/main.rs:4:5
   |
3  |     let y = &x;
   |             -- immutable borrow occurs here
4  |     let z = &mut x;
   |             ^^^^^^ mutable borrow occurs here
5  |     println!("{}", y);
   |                    - immutable borrow later used here
\`\`\`

*Skill issue? No, Rust issue.*`,

    // Slide 7: Real Software
    `# What Real Software is Written In

**Linux Kernel** → C

**Windows** → C

**Git** → C

**PostgreSQL** → C

**Redis** → C

**SQLite** → C

**Nginx** → C

### And Rust?

*Some CLI tools that rewrite \`cat\` but 0.3% faster*`,

    // Slide 8: Rust Propaganda
    `# Rust Propaganda Be Like

![Rust Propaganda](https://i.programmerhumor.io/2025/03/fd3f7074585f3ac6493a1015872ef11b3ad33297fa15b9d9179bdcc01c0d7640.png)

*They need an anime girl to convince you to use their language*

*C needs no marketing. C just works.*`,

    // Slide 9: Job Interview
    `# The Job Interview

### C Developer Interview:

> Interviewer: "Can you write a linked list?"
> 
> You: "Yes."
> 
> Interviewer: "You're hired. $200k."

### Rust Developer Interview:

> "Explain the difference between \`&\`, \`&mut\`, \`Box\`, \`Rc\`, \`Arc\`, \`RefCell\`, \`Cell\`, \`Mutex\`, \`RwLock\`, \`Pin\`, and when to use each with async lifetimes..."

*3 hours later, still explaining*`,

    // Slide 10: Conclusion
    `# Conclusion

## C:

- 50+ years of dominance
- Powers literally everything
- Simple and elegant
- Based and gigachad-pilled

## Rust:

- "C but with extra steps"
- Made for people scared of pointers
- The mass cope language

---

### Thank you for coming to my TED talk

*Written in Vim, compiled with GCC, deployed on Linux*

*Like a true chad* 🗿`
]

export async function seedPresentation() {
    try {
        await db.delete(PresentationsTable)
        console.log('Deleted all existing presentations')

        const [presentation] = await db
            .insert(PresentationsTable)
            .values({
                title: 'Why Rust Sucks & C is Based',
                icon: '⚔️',
            })
            .returning()

        console.log(`Created presentation: ${presentation.title} (ID: ${presentation.id})`)

        await db.insert(SlidesTable).values(
            SLIDES.map((content) => ({
                presentationId: presentation.id,
                slideContent: content,
            }))
        )

        console.log(`Inserted ${SLIDES.length} slides`)

        return { success: true, presentationId: presentation.id }
    } catch (error) {
        console.error('Error seeding presentation:', error)
        return { success: false, error }
    }
}

seedPresentation().then((result) => {
    console.log('Seed result:', result)
    process.exit(result.success ? 0 : 1)
})

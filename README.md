# POS-Style Estimates Calculator

## Why I Built It

I built this because I did not have a fast or reliable way to price my freelance services.

I had already structured my pricing in a spreadsheet. Every service had a name, descriptions, exclusions, deliverables, estimated hours, minimum and maximum charges, and even prerequisites.

While structured and helpful I needed something that helped me calulate pricing faster. I also did not want something bloated like Salesforce. I felt their UI for this use case was kind of bloated and always had trouble navigating their products/services. Plus I didnt wanna pay for it. Lol. I wanted something faster and more intuitive.

Coming from hospitality, I kept thinking about POS systems like Clover and Toast. You add items, you see totals instantly, you adjust quantities, and you move forward. That mental model made sense to me, so I decided to translate my pricing logic into that kind of interface.

---

## The Solution

The result is a POS inspired estimates calculator built around a cost, markup, and value range framework.

Each service has a minimum and maximum price. When services are added to the side cart, the system calculates a subtotal range. Discounts and markup multipliers can be applied. The system then suggests a median within that adjusted range.

The goal is not to spit out one arbitrary number. It is to create guardrails.

You can adjust quantities for add on services. You can remove items. You can apply standard pay schedules like 50/50 or 60/40. The calculator shows what the deposit would be.

There is also a slider to intentionally round the final number so it is clean and presentable.

This is version one. It does not yet model agile or hourly development pricing. It is currently optimized for structured design and scoped service work.

---

## Tech Stack

Built with:

- Next.js
- React
- Tailwind CSS
- shadcn/ui
- Supabase

It includes authentication and an admin layout, and will eventually expand into a lightweight CRM with contacts, organizations, and saved estimates.

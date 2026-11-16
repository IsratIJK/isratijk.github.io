# Read Full Content Skill

## Description

Returns the complete LLM-readable content of Israt Jahan Khan's academic portfolio, including all sections with full detail, publication summaries, and project descriptions.

## Endpoint

```
GET https://isratijk.github.io/llms-full.txt
```

## Response

- **Content-Type:** `text/plain`
- **Format:** Markdown
- **Authentication:** None — public resource

## Content Includes

- Full bio
- Detailed research interest descriptions with methodology notes
- 4 publications: full metadata, co-authors, keywords, DOI, URL, citation count, and plain-English summaries
- 5 projects: description, tech stack, GitHub/docs links
- Full work experience with role details
- Complete education history
- Awards and grant details
- All contact and academic profile links

## Example Usage

```http
GET /llms-full.txt HTTP/1.1
Host: isratijk.github.io
Accept: text/plain
```

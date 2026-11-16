# Read Profile Skill

## Description

Returns a concise LLM-readable summary of Israt Jahan Khan's academic profile, research interests, publications list, and contact information.

## Endpoint

```
GET https://isratijk.github.io/llms.txt
```

## Response

- **Content-Type:** `text/plain`
- **Format:** Markdown
- **Authentication:** None — public resource

## Content Includes

- Full bio and academic background
- Research interests (Computer Vision, ML, Deep Learning, Interdisciplinary AI)
- List of 4 peer-reviewed publications with DOI and citation counts
- Academic and professional experience
- Education history with honors
- Awards and grants
- Contact and academic profile links (Google Scholar, ORCID, ResearchGate, LinkedIn, GitHub)
- PhD availability statement

## Example Usage

```http
GET /llms.txt HTTP/1.1
Host: isratijk.github.io
Accept: text/plain
```

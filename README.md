# DateFormat

Easily check what your Date will look like in your format.

<img width="337" alt="dateformat example" src="https://github.com/liamo94/vscode-datetime/assets/9355016/73192277-0983-48ca-a67b-5e5b116777d6">

I have chosen the approach of explicitly adding a comment to see the format due to automatically showing it. This is due to identifying a valid ISO format. There are too many combinations of languages and functions for date formatting, and blindly regex matching would result in a lot of false positives. If anyone wants to attempt this approach, feel free to adapt.

### Using the extension

Add `[comment] ^dt` (datetime) under any string (surrounded by quotes) to see the date in the chosen format. Use the command `dateformat: insert-date` to do this automatically at your cursor. Easily edit this on the fly and watch it update in real time.

By default it will use `Date.now()`, but you can override this in setting by passing in an ISO 8601 of your choice.

### Supported languages

- c
- cpp
- csharp
- go
- html
- java
- javascript
- json
- latex
- markdown
- perl
- php
- plaintext
- python
- r
- ruby
- rust
- swift
- typescript
- xml
- yaml

This extension was inspired by [Twoslash Query Comment](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-twoslash-queries)

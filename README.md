# DateFormat

Easily check what your Date will look like after formatting.

I have chosen the approach of explicitly adding a comment to see the format due to automatically showing it. This is due to identifying a valid ISO format. There are too many combinations of languages and functions for date formatting, and blindly regex matching would result in a lot of false positives. If anyone wants to attempt this approach, feel free to adapt.

### Using the extension

Add `[comment] ^dt` (datetime) under any string (encapsulated by quotes) to see the actual string. Use the command `dateformat: insert-date` to do this automatically at your cursor.

By default it was use `Date.now()`, but you can override this in settings by passing in an ISO 8601 of your choice.

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

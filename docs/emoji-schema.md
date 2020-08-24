# Emojis

## definitions.json

#### Schema:
```json
{
  emoji title: {
    "default": {
      "href": original link URL from emojipedia.com,
      "title": the plaintext name of the emoji, used for searches
      "emoji": the unicode for the emoji,
      "shortcode": this is the ":shortcode:" representation,
      "codepoints": [utf codes like "U+270b", "U+1F3FE"]
    },
    skin-color: {
      same as "default" object
    }
  }
}
```

#### Example:
```json
{
  "Grinning Face": {
    "default": {
      "href": "/grinning-face/",
      "title": "Grinning Face",
      "emoji": "\ud83d\ude00",
      "shortcode": "grinning",
      "codepoints": []
    }
  }
}
```

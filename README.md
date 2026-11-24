# STREAMX

A browser-based IPTV-style media player prototype with a TiviMate-inspired layout.

## Current build

- TV-first layout with a left navigation rail, channel guide, categories, and playback panel
- Local M3U/M3U8 file import
- Parses channel names, groups, and stream URLs
- Attempts playback through the browser's native HTML5 video support
- Anime catalog starter entries for Naruto, Solo Leveling, and One Piece
- Search and responsive layout

## Important playback limits

STREAMX does not include channels, movies, anime episodes, subscriptions, or copyrighted streams. The catalog entries are not playable video by themselves. To watch something, you must provide a compatible stream from a service or provider you are authorized to use.

The current M3U importer reads channel entries and attempts to play the selected URL. It does not yet implement a full EPG/XMLTV guide, VOD metadata, series/season browsing, account-based provider login, or format transcoding. A playlist can contain unsupported, expired, or restricted URLs, and playback is not guaranteed.

For movies and series, the playlist must actually include compatible VOD entries and the app needs a dedicated VOD/series workflow. That is not complete in this build.

## Samsung TV compatibility

This is a web app, not a native Samsung TV app. A Samsung TV from around 2015 may have limited browser and codec support. Test it in the TV browser; some modern formats or encrypted streams may not work. Do not attempt to bypass DRM or provider restrictions.

## Publish

In GitHub, open Settings -> Pages, select Deploy from a branch, choose main and /(root), then save.

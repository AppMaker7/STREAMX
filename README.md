# STREAMX

A clean, remote-friendly media hub prototype designed to be tested in a browser on a TV.

## Current features

- Home, Live TV, Anime, Movies, TV Shows, My List, and Settings sections
- English-dub-focused anime starter catalog: Naruto, Solo Leveling, and One Piece
- Search and saved favorites (stored in the current browser)
- Import an authorized M3U/M3U8 playlist and display its channel names/groups
- Responsive dark interface with large focus targets for TV navigation

## Run it

Open `index.html` in a modern browser, or publish the repository with GitHub Pages:

1. Open the repository's **Settings**.
2. Choose **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select **main** and **/(root)**, then save.
5. Wait for GitHub Pages to publish the site.

## Important notes

STREAMX is a media hub prototype. It does **not** include TV channels, paid subscriptions, or copyrighted video streams. Only import playlists and use services/content that you are authorized to access. The anime cards are catalog entries, not playable streams; check legitimate services for current English-dub availability.

M3U import currently reads channel names and groups locally in the browser. It does not fetch or play channel streams yet. A later playback stage needs to be tested against the TV's browser and the formats supported by the playlist provider.

## Samsung TV compatibility

This is a web app, not a native Samsung TV app. Older Samsung Smart TVs may have limited browser support. Test the published site in the TV browser before deciding whether a native Tizen app or a supported external streaming device is needed.
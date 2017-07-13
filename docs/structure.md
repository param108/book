# Structure

## Overview
Each story gets its own directory inside `public`.
Place all resources there, html pages, images etc.

Inside a stories html page you will access images as 
`/<story name>/img/image_file_name`

Html pages are strictly named 1.html, 2.html, 3.html and so on and are placed in `<story name>` directory.

The backend functionality is as follows
1. URLs
- `/<story name>/`
This will download the base js and static code. The javascript will pick up the location.hash and do an ajax call to `/<story name>/n/`
- `/<story name/#<n>`
This will show the nth chapter of the story

## Functional overview


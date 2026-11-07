# Lab 6: Best Animal SPA

Update `/static/spa.html` and `/static/script.js` to recreate the multi-page
experience, but on a single page that doesn't reload.

## Run locally

From `lab-6`, create a virtual environment and install Flask:

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install Flask
python -m flask --app app run --host 127.0.0.1 --port 8006
```

Open <http://127.0.0.1:8006/spa> for the SPA, or
<http://127.0.0.1:8006/> for the original server-rendered version.
Use Flask rather than `python -m http.server`: direct visits and refreshes
at `/spa/cat`, `/spa/dog`, and `/spa/bear` need the supplied Flask routes.

The starter deliberately delays each document response by three seconds.
An SPA selection updates the existing document without another document request;
the browser can still request an animal image when it is first displayed.

## How it works

- `spa.html` retains the starter layout, with real `/spa/<animal>` links,
  absolute `/static/` resource paths, and a deferred script.
- `renderAnimal` updates each existing card's text, image, alternative text,
  and `happy`/`sad` class. Only the selected animal is happy.
- Ordinary clicks prevent the link's default navigation, call `pushState`
  when the path changes, and render the new selection immediately.
  Selecting the same animal again does not add a duplicate history entry.
- `renderLocation` reads the URL on startup and on `popstate`, so direct
  visits, refreshes, and Back/Forward all restore the matching selection.
  `/spa` and unknown animal names show all three animals as sad.
- Modified clicks retain native browser behavior. The footer still opens
  the original server-rendered version with normal page navigation.

The course's `app.py`, server template, and images are retained unchanged.
The stylesheet retains the original styling, with only trailing whitespace
removed. No frontend framework or build step is needed.

## Verify in a browser

| Action | Expected result |
| --- | --- |
| Open `/spa` | Cat, dog, and bear are sad |
| Select each animal in turn | URL changes; only that animal is happy |
| Select the current animal again | No additional history entry |
| Use Back to return to `/spa`, then Forward | Selection follows the URL, including the initial sad state |
| Open `/spa/cat`, `/spa/dog`, or `/spa/bear` directly, then refresh | Matching selection and working images |
| Focus an animal link and press Enter | Same behavior as an ordinary click |
| Command/Ctrl-click an animal link | Native browser shortcut is preserved |
| Open `/spa/fox` | All animals are sad |
| Follow either footer link | Switches between the SPA and original version |

In DevTools Network, clear the log after loading `/spa`, then switch animals
and use Back/Forward. No new request of type **document** should appear.
Image requests are expected. The Console should have no JavaScript errors.

Verification completed: JavaScript syntax checking and 37 Chromium browser
checks passed, including comparison with all three original server-rendered
states. The browser checks observed no new document requests during SPA
selection or Back/Forward, no JavaScript errors, and no HTTP error responses.
The verification environment and browser harness are outside this repository.

## Source and assistance

Starter files: [Lab 6 course materials](https://github.com/UChicagoWebDev/course_materials/tree/ecafa70eaafec97ee168c1072976f1815063410d/assignments/lab-6).
Codex assisted with implementation, explanation, and verification.

References:

- [MDN: History.pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)
- [MDN: popstate event](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event)

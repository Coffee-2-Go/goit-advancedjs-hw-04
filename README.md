# Tier 2. Module 2 - Advanced JavaScript
## Topic 8. Pagination and async/await syntax. Homework

### Task 1. Image search

Use the code from the previous homework and add the new functionality to the image search application code.

#### Refactoring

Add the [Axios](https://axios-http.com/) library to the project for working with HTTP requests and refactor it to replace the use of `fetch`.

Use the `async/await` syntax for working with asynchronous requests. Refactor your code.

#### Pagination

The Pixabay API supports pagination and provides the `page` and `per_page` parameters. Make sure that each response for image searches returns 15 objects (the default is 20).

* The initial value of the `page` parameter should be `1`.
* With each subsequent request, it should be incremented by `1`.
* If you search for a new keyword, the `page` value should be returned to the original value, as there will be pagination for the new image collection.

Add a button markup with the text `Load more` in the HTML document after the gallery, which, when clicked, should query the next group of images and add the markup to the existing gallery elements. To do this, when submitting the form, you need to save what the user entered in a global variable.

* While there are no images in the gallery, the button should be hidden.
* After the images appear in the gallery, the button appears in the interface under the gallery.
* When the form is resubmitted, the button is initially hidden, and after receiving the query results, it is displayed again as needed.
* Move the loading indicator below the button to load additional images.

Watch a demo [video](https://youtu.be/00hLHI3hx28) of the application at this stage.

#### End of collection

In the response, the backend returns the `totalHits` property — the total number of images that match the search criteria (for a free account). If the user has reached the end of the collection, hide the Load more button and display a message with the text `"We're sorry, but you've reached the end of search results."`.

Watch the demo [video](https://youtu.be/0ZQVWxm0VcQ) of the application at this stage.

#### Page Scrolling

Smoothly scroll the page after requesting and rendering each subsequent group of images. To do this, get the height of one gallery card in your code using the [getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) function. Then use the [window.scrollBy](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy) method to scroll the page by two gallery card heights.

Watch a demo [video](https://youtu.be/aEhYvL7wIV8) of the application at this stage.

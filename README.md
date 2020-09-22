# perf-analytics.js

Client-side JS library for [perf-analytics](https://github.com/OnurCem/perf-analytics)

Demo: [https://perf-analytics-js.herokuapp.com/test.html](https://perf-analytics-js.herokuapp.com/test.html)

## Usage

Add the following code immediately after the `<head>` tag on each page of your site.

```html
<script src="https://perf-analytics-js.herokuapp.com/perf-analytics.umd.min.js"></script>
<script>
  perfAnalytics.init();
</script>
```

## Development

### Building the code

To transpile the code and build the bundle, run the following command:

```shell script
npm run build
```

To build the code and watch for changes:

```shell script
npm run watch
```

You can use the `dist/test.html` file to test the library.

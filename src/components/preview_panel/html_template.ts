const css  = `
* {
  box-sizing: border-box;
}
`;


export const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Running your code</title>
  <style>
    ${css}
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="module">
    function createErrorTip(errMsg) {
      const root = document.querySelector('#root');
      const errorMessage = document.createElement('div');
      errorMessage.style.color = 'red';
      errorMessage.innerHTML = '<h4>Runtime Error</h4><p>' + errMsg + '</p>';
      root.append(errorMessage);
      window.parent.postMessage({ source: "iframe", type: "iframe_error", message: errMsg }, "*");
    }

    window.addEventListener('message', (event) => {
      try {
        eval(event.data)
      } catch(err) {
        createErrorTip(err);
      }
    }, false)

    window.onerror = function (err) {
      createErrorTip(err);
    };

    window.onunhandledrejection = function (err) {
      createErrorTip(err.reason);
    };
  </script>
</body>
</html>
`;
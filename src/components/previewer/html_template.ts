const css  = `
* {
  box-sizing: border-box;
}

input {
  width: 100%;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  padding: 0 8px;
}

.inputPart {
  width: calc(100% - 80px);
}

input:disabled {
  color: rgb(140, 140, 140);
  cursor: not-allowed;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button {
  margin-left: 8px;
  width: 72px;
  height: 32px;
  border-radius: 4px;
  border: none;
  background: rgb(123, 103, 238);
  color: #FFFFFF;
  cursor: pointer;
}

.title {
  margin-top: 8px;
}

.content {
  margin-top: 4px;
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
    window.addEventListener('message', (event) => {
      try {
        eval(event.data)
      } catch(err) {
        const root = document.querySelector('#root');
        const errorMessage = document.createElement('div');
        errorMessage.style.color = 'red';
        errorMessage.innerHTML = '<h4>Runtime Error</h4></p>' + err + '</p>';
        root.append(errorMessage);
        console.error(err);
      }
    }, false)

    window.onerror = function (err) {
      const root = document.querySelector('#root');
      const errorMessage = document.createElement('div');
      errorMessage.style.color = 'red';
      errorMessage.innerHTML = '<h4>Runtime Error</h4></p>' + err + '</p>';
      root.append(errorMessage);
      window.parent.postMessage({ source: "iframe", type: "iframe_error", message: err }, "*");
    };

    window.onunhandledrejection = function (err) {
      const root = document.querySelector('#root');
      const errorMessage = document.createElement('div');
      errorMessage.style.color = 'red';
      errorMessage.innerHTML = '<h4>Runtime Error</h4></p>' + err.reason + '</p>';
      root.append(errorMessage);
      window.parent.postMessage({ source: "iframe", type: "iframe_error", message: err.reason }, "*");
    };
  </script>
</body>
</html>
`;
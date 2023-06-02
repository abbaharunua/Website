// Instantiate a showdown converter
var converter = new showdown.Converter();

fetch('https://api.github.com/users/abbaharunua/repos')
  .then(response => response.json())
  .then(repos => {
    for (let repo of repos) {
      let contentsUrl = repo.contents_url.replace('{+path}', '/README.md');
      fetch(contentsUrl)
        .then(response => response.json())
        .then(data => {
          let markdown = atob(data.content);
          let html = converter.makeHtml(markdown);
          let readmeDiv = document.createElement('div');
          readmeDiv.className = "readme"
          readmeDiv.innerHTML = html;
          let placeToOutput = document.querySelector('.readme-section');
          placeToOutput.appendChild(readmeDiv);
          //document.getElementById('projects').appendChild(readmeDiv);
        })
        .catch(error => console.error('Error:', error));
    }
  })
  .catch(error => console.error('Error:', error));
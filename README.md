This readme is mostly for posterity.

To deploy this folder to `gh-pages`, set up the following as a :

```
#!/bin/sh
if [ -z "$1" ]
	git subtree push --prefix $1 origin gh-pages
then
  echo "Which folder do you want to deploy to GitHub Pages?"
  exit 1
fi
```

Source: <https://gist.github.com/cobyism/4730490>
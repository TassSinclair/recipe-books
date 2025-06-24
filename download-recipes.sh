# wget "https://www.abc.net.au/news/feed/2078/rss.xml?limit=200" -O 2078.xml

# cat 2078.xml| xq '.rss.channel.item[].title'

 
cat topicstoriesmore.json | jq -r '.collection[] | select (.tags[].title == "Recipe") | .link' | while read -r path;
do
   url="https://www.abc.net.au${path}"
   filename=$(basename "$path").pdf
   wkhtmltopdf --print-media-type  "$url" "$filename" 
   exit 0
done
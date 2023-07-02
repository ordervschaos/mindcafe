import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
const getYouTubeVideoId = (url) => {
  const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?(?:\w+=\w+&)*v=|watch\?v=)|youtu\.be\/)([\w-]+)(?:\S+)?$/;
  const match = url.match(pattern);
  
  if (match && match[1]) {
    return match[1];
  } else {
    // Handle invalid or unsupported YouTube URL
    return null;
  }
};

import ReactDOMServer from 'react-dom/server';


const Preview = ({ content }) => {
  const previewRef = useRef(null);

  useEffect(() => {
    if (previewRef.current) {
      const element = previewRef.current;

      // Clear the existing content
      while (element.firstChild) {
        element.firstChild.remove();
      }

      // Create a temporary container for rendering the content
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = content;

      // Traverse through the temporary container to handle media embeds
      const figureElements = tempContainer.querySelectorAll('figure.media');

      figureElements.forEach((figureElement) => {
        const oembedElement = figureElement.querySelector('oembed');
        const url = oembedElement.getAttribute('url');
        const videoWrapper = document.createElement('div');
        const videoEmbed = (
          <div>
            <YouTube videoId={getYouTubeVideoId(url)} /> {/* Implement a function to extract the video ID from the YouTube URL */}
          </div>
        );
        const videoHtml = ReactDOMServer.renderToString(videoEmbed);
        videoWrapper.innerHTML = videoHtml;
        element.appendChild(videoWrapper);
      });

      // Append the modified content to the actual preview element
      element.appendChild(tempContainer.firstChild);
    }
  }, [content]);

  return <div ref={previewRef} />;
};

export default Preview;

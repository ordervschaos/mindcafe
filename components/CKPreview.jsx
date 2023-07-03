import React, { useEffect, useRef } from 'react';

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

      // Handle media embeds
      const figureElements = tempContainer.querySelectorAll('figure.media');

      figureElements.forEach((figureElement) => {
        const oembedElement = figureElement.querySelector('oembed');
        const url = oembedElement.getAttribute('url');
        const videoWrapper = document.createElement('div');
        const videoEmbed = document.createElement('iframe');
        videoEmbed.setAttribute('src', url);
        videoEmbed.setAttribute('frameborder', '0');
        videoEmbed.setAttribute('allowfullscreen', 'true');
        videoWrapper.appendChild(videoEmbed);
        
        // Apply CSS styles to center the video element
        videoWrapper.style.display = 'flex';
        videoWrapper.style.justifyContent = 'center';
        videoWrapper.style.alignItems = 'center';
        
        figureElement.parentNode.replaceChild(videoWrapper, figureElement);
        
      });


      for (const child of tempContainer.childNodes) {
        element.appendChild(child.cloneNode(true));
      }


      // Append the modified content to the actual preview element
      // element.appendChild(tempContainer.firstChild);
    }
  }, [content]);

  return <div ref={previewRef} className="prose"/>;

};

export default Preview;

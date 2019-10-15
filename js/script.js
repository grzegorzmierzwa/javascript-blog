'use strict';

const titleClickHandler = function (event) {
  console.log('Link was clicked!');
  console.log(event);
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement (with plus): ' + clickedElement);
  console.log(clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('Clicked element:' + articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetSelector = document.querySelector(articleSelector);
  console.log(targetSelector);

  /* [DONE] add class 'active' to the correct article */

  targetSelector.classList.add('active');

}

{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';


  function generateTitleLinks() {
    console.log('Test!');
    const element = this;

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    /* for each article */

    let html = '';

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      console.log(article);

      /* get the article id */

      const articleId = article.getAttribute('id');
      console.log('id: ' + articleId);

      /* find the title element */
      /* get title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);

      /* create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('HTML element: ' + linkHTML);

      /* insert link into titleList */

      /* titleList.insertAdjacentHTML('beforeend', linkHTML); */
      html = html + linkHTML;

      /* console.log(html); */
    }

    titleList.innerHTML = html;
  }

  generateTitleLinks();

}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
'use strict';

const titleClickHandler = function (event) {
  // console.log('Link was clicked!');
  // console.log(event);
  event.preventDefault();
  const clickedElement = this;
  // console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  // console.log('clickedElement (with plus): ' + clickedElement);
  // console.log(clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  // console.log('Clicked element:' + articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetSelector = document.querySelector(articleSelector);
  // console.log(targetSelector);

  /* [DONE] add class 'active' to the correct article */

  targetSelector.classList.add('active');
};


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = ".tags.list";


function generateTitleLinks(customSelector = '') {
  // console.log('Test!');
  const element = this;

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);

  /* [DONE] for each article */

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  // console.log('optAtt:', optArticleSelector)
  // console.log('custom:', customSelector)
  console.log('optAtt + custom:', optArticleSelector + customSelector)

  for (let article of articles) {
    // console.log(article);

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');
    // console.log('id: ' + articleId);

    /* [DONE] find the title element */
    /* [DONE] get title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    // console.log(articleTitle);

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // console.log('HTML element: ' + linkHTML);

    /* [DONE] insert link into titleList */

    /* [DONE] titleList.insertAdjacentHTML('beforeend', linkHTML); */
    html = html + linkHTML;

    /* [DONE] console.log(html); */
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  // console.log('Test articles: ' + articles);
  
  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    // console.log('Test Tags: ' + article);
  
    /* [DONE] find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
    // console.log(tagList);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log('Tags element:' + articleTags);

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /*[DONE] START LOOP: for each tag */
    for(let tag of articleTagsArray){
      // console.log(tag);

      /* [DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag  + '</a></li>';
      // console.log('HTML element: ' + linkHTML);

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      console.log(allTags);

      /* [DONE] END LOOP: for each tag */
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;

  /* [DONE] END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ') ' + '</a></li>';

  /* [NEW] END LOOP: for each tag in allTags */
  }

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTagsHTML;
  // console.log(allTags);
}

generateTags();


function tagClickHandler(event){
  // console.log('Link was clicked!');

  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  // console.log(href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('Tag: ', tag);

  /* [DONE] find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('Active Links: ', activeTagLinks);

  /* [DONE] START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks){
    
    /* remove class active */
    activeTagLink.classList.remove('active');

  /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  // console.log(tagLinks); 

  /* [DONE] START LOOP: for each found tag link */
  for (let tagLink of tagLinks){

    /* [DONE] add class active */
    tagLink.classList.add('active');

  /* [DONE] END LOOP: for each found tag link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){

  /* [DONE] find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');
  // console.log(links);
  
  /* [DONE] START LOOP: for each link */
  for(let link of links){

    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors (){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  // console.log(articles);

  /* [DONE] START LOOP: for every article */
  for (let article of articles){
    /* [DONE] find author wrapper */
    const authorList = article.querySelector(optArticleAuthorSelector);
    
    /* [DONE]  make html variable with empty string */
    let html = '';

    /* [DONE] get author from data-author attribute  */
    const articleAuthor = article.getAttribute('data-authors');
    // console.log(articleAuthor)

    /* [DONE] generate HTML of the link */
    const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';

    /* [DONE] add generated code to html variable */
    html = html + linkHTML;

    /* [DONE] insert HTML of all the links into the authors wrapper */
    authorList.innerHTML = html;

    /* [DONE] END LOOP: for every article */
  }
  
}

generateAuthors ()

function authorClickHandler(event){
  // console.log('Link was clicked!');

  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href', href);

  /* [DONE] make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('author: ', author);

  /* [DONE] find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('Active Links: ', activeAuthorLinks);

  /* [DONE] START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorLinks){

    /* remove class active */
    activeAuthorLink.classList.remove('active');
  
  /*  END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('authorLinks: ', authorLinks);

  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks){
    console.log(authorLink);

    /* add class active */
    authorLink.classList.add('active');

  /* END LOOP: for each found author link */
  }
  
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-authors="' + author + '"]');

}

function addClickListenersToAuthors(){

  /* [DONE] find all links to authors */
  const links = document.querySelectorAll('a[href^="#author-"]');
  //console.log('links: ', links)

  /* [DONE] START LOOP: for each link */
  for(let link of links){

    /* [DONE] add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);

  /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToAuthors()
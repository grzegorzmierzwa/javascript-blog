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
  optArticleAuthorSelector = 'post-author';


function generateTitleLinks(customSelector = '') {
  // console.log('Test!');
  const element = this;

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);

  /* [DONE] for each article */

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

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
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){

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

      /* [DONE] END LOOP: for each tag */

    }

    /* [DONE] insert HTML of all the links into the tags wrapper */

    tagList.innerHTML = html;

  /* [DONE] END LOOP: for every article: */
  }
}

generateTags();


function tagClickHandler(event){
  console.log('Link was clicked!');

  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

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
  console.log(tagLinks); 

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
  console.log(links);
  
  /* [DONE] START LOOP: for each link */
  for(let link of links){

    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors (){
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log(articles);

  for (let article of articles){
    const authorList = article.querySelector(optArticleAuthorSelector);
    
    let html = '';

    const articleAuthor = article.getAttribute('data-authors');
    
  }

/*
 
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
  
    const tagList = article.querySelector(optArticleTagsSelector);    
    
    let html = '';

    const articleTags = article.getAttribute('data-tags');

    const articleTagsArray = articleTags.split(' ');  

    for(let tag of articleTagsArray){
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag  + '</a></li>';
      html = html + linkHTML;
    }

    tagList.innerHTML = html;


  }
} 
*/

}

generateAuthors ()
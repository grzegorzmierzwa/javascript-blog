'use strict';

const opt = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  cloudClassCount: 5,
  cloudClassPrefix: 'element-size-',
};

const templates = {
  // eslint-disable-next-line no-undef
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  // eslint-disable-next-line no-undef
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  // eslint-disable-next-line no-undef
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  // eslint-disable-next-line no-undef
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  // eslint-disable-next-line no-undef
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

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

function generateTitleLinks(customSelector = '') {
  // console.log('Test!');

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(opt.titleListSelector);

  /* [DONE] for each article */

  let html = '';

  const articles = document.querySelectorAll(opt.articleSelector + customSelector);
  // console.log('optAtt:', opt.articleSelector)
  // console.log('custom:', customSelector)
  console.log('optAtt + custom:', opt.articleSelector + customSelector);

  for (let article of articles) {
    // console.log(article);

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');
    // console.log('id: ' + articleId);

    /* [DONE] find the title element */
    /* [DONE] get title from the title element */

    const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
    // console.log(articleTitle);

    /* [DONE] create HTML of the link */

    // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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

function calculateParams(tags) {
  /* [NEW-2] create a new variable params with object */
  const params = {
    max: 0,
    min: 999999,
  };
  /* [NEW-2] START LOOP: for each tags */
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    /* [NEW-2] max numer of params */
    params.max = Math.max(tags[tag], params.max);
    /* [NEW-2] min numer of params */
    params.min = Math.min(tags[tag], params.min);
    /* [NEW-2] END LOOP: for each tags */
  }
  /* [NEW-2] return params object */
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);

  const tagClass = opt.cloudClassPrefix + classNumber;
  console.log(tagClass);

  return tagClass;
}

function generateTags() {

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);
  // console.log('Test articles: ' + articles);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    // console.log('Test Tags: ' + article);

    /* [DONE] find tags wrapper */
    const tagList = article.querySelector(opt.articleTagsSelector);
    // console.log(tagList);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log('Tags element:' + articleTags);

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /*[DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      // console.log(tag);

      /* [DONE] generate HTML of the link */
      // const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      // console.log('HTML element: ' + linkHTML);

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      // eslint-disable-next-line no-prototype-builtins
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      // console.log(allTags);

      /* [DONE] END LOOP: for each tag */
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;

    /* [DONE] END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW-2] make variable with function wich calculate tags params */
  const tagsParams = calculateParams(allTags);
  console.log('tagsParams', tagsParams);

  /* [NEW] create variable for all links HTML code */
  // let allTagsHTML = '';
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {

    /* [NEW] generate code of a link and add it to allTagsHTML */
    // allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
    // allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a>(' + allTags[tag] + ')</li>';
    // allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
    allTagsData.tags.push({
      tag: tag,
      // count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

    /* [NEW] END LOOP: for each tag in allTags */
  }

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  // console.log(allTags);
  console.log('=============');
  console.log('allTagsData', allTagsData);
}

generateTags();


function tagClickHandler(event) {
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
  for (let activeTagLink of activeTagLinks) {

    /* remove class active */
    activeTagLink.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  // console.log(tagLinks); 

  /* [DONE] START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {

    /* [DONE] add class active */
    tagLink.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags() {

  /* [DONE] find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');
  // console.log(links);

  /* [DONE] START LOOP: for each link */
  for (let link of links) {

    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

    /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  /* [NEW] create a new variable allTags with an empty object */
  let allAuthors = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);
  // console.log(articles);

  /* [DONE] START LOOP: for every article */
  for (let article of articles) {
    /* [DONE] find author wrapper */
    const authorList = article.querySelector(opt.articleAuthorSelector);

    /* [DONE]  make html variable with empty string */
    let html = '';

    /* [DONE] get author from data-author attribute  */
    const articleAuthor = article.getAttribute('data-authors');
    // console.log(articleAuthor)

    /* [DONE] generate HTML of the link */
    // const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
    const linkHTMLData = {id: articleAuthor, title: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);

    /* [DONE] add generated code to html variable */
    html = html + linkHTML;

    /* [DONE] insert HTML of all the links into the authors wrapper */
    authorList.innerHTML = html;

    /* [NEW] check if this link is NOT already in allTags */
    // eslint-disable-next-line no-prototype-builtins
    if (!allAuthors.hasOwnProperty(articleAuthor)) {
      
      /* [NEW] add generated code to allTags object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    console.log('articleAuthor:', articleAuthor);

    /* [DONE] END LOOP: for every article */
  }

  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector('.authors');
  console.log('authorList', authorList);

  /* [NEW-2] make variable with function wich calculate authors params */
  const authorsParams = calculateParams(allAuthors);
  console.log('authorsParams', authorsParams);

  /* [NEW] create variable for all links HTML code */
  // let allAuthorsHTML = '';
  const allAuthorsData = {authors: []};

  /* [NEW] START LOOP: for each author in allAuthors: */
  for (let author in allAuthors) {

    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    // allAuthorsHTML += '<li><a href="#author-' + author + '" class="' + calculateTagClass(allAuthors[author], authorsParams) + '">' + author + '</a>(' + allAuthors[author] + ')</li>';
    // allAuthorsHTML += '<li><a href="#author-' + author + '" class="' + calculateTagClass(allAuthors[author], authorsParams) + '">' + author + '</a></li>';
    allAuthorsData.authors.push({
      author: author,
      className: calculateTagClass(allAuthors[author], authorsParams)
    });
    /* [NEW] END LOOP: for each author in allAuthors */
  }

  /* [NEW] add html from allAuthors to authorList */
  // authorList.innerHTML = allAuthorsHTML;
  // console.log('allAuthors', allAuthors);
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
  console.log('allAuthorsData', allAuthorsData);

}

generateAuthors();

function authorClickHandler(event) {
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
  for (let activeAuthorLink of activeAuthorLinks) {

    /* remove class active */
    activeAuthorLink.classList.remove('active');

    /*  END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('authorLinks: ', authorLinks);

  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
    console.log(authorLink);

    /* add class active */
    authorLink.classList.add('active');

    /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-authors="' + author + '"]');

}

function addClickListenersToAuthors() {

  /* [DONE] find all links to authors */
  const links = document.querySelectorAll('a[href^="#author-"]');
  //console.log('links: ', links)

  /* [DONE] START LOOP: for each link */
  for (let link of links) {

    /* [DONE] add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);

    /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToAuthors();
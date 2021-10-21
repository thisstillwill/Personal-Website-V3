const toc = () => `<h2>Table of Contents</h2>\n\n[[toc]]`;

const hero = (
  content
) => `<header class="bg-primary text-background text-4xl md:text-5xl dark:bg-border-dark dark:text-text-dark">
<div class="max-w-screen-xl px-6 py-8 mx-auto md:py-12">
${content}
</div>
</header>`;

const sectionContainer = (
  content,
  title
) => `<section class="max-w-screen-xl px-6 mx-auto mt-8 lg:mt-12">
<h2 class="text-3xl lg:text-4xl border-b-2 pb-4 border-text border-dashed dark:border-text-dark">${title}</h2>
${content}
</section>`;

const cardContainer = (
  content
) => `<div class="grid grid-flow-row gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
${content}
</div>`;

const card = (
  link,
  titleLevel,
  title,
  dateTime,
  displayTime,
  description,
  tags
) => `<a class="transition duration-150 ease-in-out transform border-2 border-primary rounded-lg hover:scale-105 focus:scale-105 hover:shadow-xl focus:shadow-xl bg-background dark:border-border-dark dark:bg-border-dark" href="${link}">
<article class="h-full p-4">
<${titleLevel} class="text-2xl">${title}</${titleLevel}>
<time class="block mt-1 font-mono text-sm" datetime="${dateTime}">${displayTime}</time>
<p class="mt-2 leading-normal">${description}</p>
<ul class="flex flex-wrap mt-4">
${(tags || [])
  .map(function (tag) {
    return `<li class="mb-2 mr-2">
    <span class="bg-primary text-background px-2 py-1 rounded-md text-xs inline-flex font-medium whitespace-nowrap dark:bg-primary-dark dark:text-text-dark">${tag}</span>
    </li>`;
  })
  .join("")}
</ul>
</article>
</a>`;

module.exports = {
  toc,
  hero,
  sectionContainer,
  cardContainer,
  card,
};

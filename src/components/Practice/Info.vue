<template>
  <div class="main">
    <Navigation />
        <div class="top-wrapper">
          <div class="title-wrapper">
            <div class="title">All about GitHub...</div>            
          </div>
          <div>
              <div class="paragraph">
                At a high level, GitHub is a website and cloud-based service that helps developers store and manage their code, 
                as well as track and control changes to their code. To understand exactly what GitHub is, 
                you need to know two connected principles:
              </div>
              <div class="paragraph numbers">
                1. Version control
              </div>
              <div class="paragraph numbers">
                2. Git
              </div>
              <div class="paragraph">
                First, let's explain those two principles. Then, we'll dig into more about GitHub and how you can actually use GitHub.
              </div>
              <h1 class="subtitle">What Is Version Control?</h1>
              <div class="paragraph">
                Version control helps developers track and manage changes to a software project's code. 
                As a software project grows, version control becomes essential. Take WordPress as an example...
              </div>
              <div class="paragraph">
                At this point, WordPress is a pretty big project. If a core developer wanted to work on one specific part of the WordPress codebase, 
                it wouldn't be safe or efficient to have them directly edit the “official” source code.
                Instead, version control lets developers safely work through branching and merging.
              </div>
              <div class="paragraph">
                With branching, a developer duplicates part of the source code (called the repository). 
                The developer can then safely make changes to that part of the code without affecting the rest of the project.
              </div>
              <div class="paragraph">
                Then, once the developer gets his or her part of the code working properly, he or she can merge that code back 
                into the main source code to make it official. All of these changes are then tracked and can be reverted if need be.
              </div>
              <h1 class="subtitle">What Is Git?</h1>
              <div class="paragraph">
                Git is a specific open-source version control system created by Linus Torvalds in 2005.
                Specifically, Git is a distributed version control system, which means that the entire codebase 
                and history is available on every developer's computer, which allows for easy branching and merging.
                According to a Stack Overflow developer survey, over 87% of developers use Git.
              </div>
              <h1 class="subtitle">So What Is GitHub, Then?</h1>
              <div class="paragraph">
                  GitHub is a for-profit company that offers a cloud-based Git repository hosting service. 
                  Essentially, it makes it a lot easier for individuals and teams to use Git for version control and collaboration.
              </div>
              <div class="paragraph">
                GitHub's interface is user-friendly enough so even novice coders 
                can take advantage of Git. Without GitHub, using Git generally requires a bit more 
                technical savvy and use of the command line.
              </div>
              <div class="paragraph">
                  GitHub is so user-friendly, though, that some people even use GitHub to manage other types of projects - like writing books.
                Additionally, anyone can sign up and host a public code repository for free, which makes GitHub especially 
                popular with open-source projects.
              </div>
              <div class="paragraph">
                 As a company, GitHub makes money by selling hosted private code repositories, as well as other 
                 business-focused plans that make it easier for organizations to manage team members and security. 
              </div>
              <h1 class="subtitle">How do I use GitHub?</h1>
              <div class="paragraph">
                  From the GitHub website, you can view a project's code and the various branches that are being worked on, 
                  as well as when someone made a commit (this is kind of like “saving” a file). 
                  Depending on how a repository is set up, you also might be able to 
                  create your own branch and make your own commits there.
              </div>
              <div class="paragraph">
                When you make changes on your branch, you could submit that code back to a branch by making a pull request.
                A pull request is basically asking the person in charge of the branch to include your code. 
                And it also helps that person see exactly what you've changed in the code.
              </div>
              <div class="paragraph">
                If you wanted to edit some or all of a repository's source code on your own account on a more permanent basis, 
                you could fork it by clicking the Fork button (a fork is similar in concept to a branch, but a fork is more permanent).
              </div>
              <div class="paragraph" style="font-size: 0.75rem;">
                GitHub overview from <a target="_blank" href="https://kinsta.com/knowledgebase/what-is-github/">this blog post</a>.
              </div>
          </div>
      </div>    
  </div>
</template>

<script>

import Navigation from '../../router/BeginnerNav.vue'



export default {
  name: 'Search',
  components: {
    Navigation,
  },
}
</script>

<style scoped>
.columns {
    height: calc(100% - 5rem);
    margin: 0;
}

.paragraph {
    color: white;
    padding: 0.25rem;

}

.numbers {
    padding-left: 2rem;
}

.title-wrapper {
  display:flex;
  justify-content: space-between;
  flex-direction: column;
}
.button {
  margin-right: 1em;
}
.top-wrapper {
  display:flex;
  flex-direction: column;
  background-color: #272323;
  flex-grow: 1;
  border-color: green;
  border-width: 1px;
  border-style: solid;
  overflow-y: scroll;
  color: white;
  height: calc(100% - 5rem);
  margin: 0;
  padding: 1.5rem 5%;
}
.title {
  color: white;
}

.subtitle {
    color: #fafafa;
    font-weight: 600;
    font-size: 1.5rem;
    margin-top: 1.25rem;
    margin-bottom: 0.75rem !important;
}
.top-wrapper::-webkit-scrollbar {
  display: none;
}


@media only screen and (max-width: 770px) {
  .sidebar {
    display: none;
  }
  .columns {
    width: 100%;
  }
  .general-wrapper {
    padding-left: 20px;
  }
  .top-wrapper {
    height: 100%;
  }
}
</style>

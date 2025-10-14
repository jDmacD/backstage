// There's a bit of a gap in the docs
// I'm not sure where the imports and useStyles(), useLogoStyles() etc come from
// Is it supposed to be from Strorybook?
// - https://backstage.io/storybook/?path=/story/plugins-home-templates--default-template
// - https://backstage.io/docs/getting-started/homepage/#composing-your-homepage
// - https://www.kosli.com/blog/succeeding-with-backstage-part-1-customizing-the-look-and-feel-of-backstage/
// Turns out its here
// - https://github.com/backstage/backstage/blob/master/packages/app/src/components/home/templates/DefaultTemplate.stories.tsx 
// Base imports to build the home page

import {  
  HomePageToolkit,  
  HomePageCompanyLogo,  
  HomePageStarredEntities,  
  TemplateBackstageLogo,  
  TemplateBackstageLogoIcon,  
} from '@backstage/plugin-home';  
import { Content, Page, InfoCard } from '@backstage/core-components';  
import { Grid, makeStyles } from '@material-ui/core';  
import { SearchContextProvider } from '@backstage/plugin-search-react';  
import { HomePageSearchBar } from '@backstage/plugin-search';

// Styles
const useStyles = makeStyles(theme => ({  
  searchBarInput: {  
    maxWidth: '60vw',  
    margin: 'auto',  
    backgroundColor: theme.palette.background.paper,  
    borderRadius: '50px',  
    boxShadow: theme.shadows[1],  
  },  
  searchBarOutline: {  
    borderStyle: 'none',  
  },  
}));  
  
const useLogoStyles = makeStyles(theme => ({  
  container: {  
    margin: theme.spacing(5, 0),  
  },  
  svg: {  
    width: 'auto',  
    height: 100,  
  },  
  path: {  
    fill: '#7df3e1',  
  },  
}));  
    
export const HomePage = () => {
  const classes = useStyles();
  const {
    svg,
    path,
    container
  } = useLogoStyles();
  return <SearchContextProvider>
      <Page themeId="home">
        <Content>
          <Grid container justifyContent="center" spacing={6}>
            <HomePageCompanyLogo className={container} logo={<TemplateBackstageLogo classes={{
            svg,
            path
          }} />} />
            <Grid container item xs={12} justifyContent="center">
              <HomePageSearchBar InputProps={{
              classes: {
                root: classes.searchBarInput,
                notchedOutline: classes.searchBarOutline
              }
            }} placeholder="Search" />
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={12} md={6}>
                <HomePageStarredEntities />
              </Grid>
              <Grid item xs={12} md={6}>
                <HomePageToolkit tools={Array(8).fill({
                url: '#',
                label: 'link',
                icon: <TemplateBackstageLogoIcon />
              })} />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoCard title="Composable Section">
                  {/* placeholder for content */}
                  <div style={{
                  height: 370
                }} />
                </InfoCard>
              </Grid>
            </Grid>
          </Grid>
        </Content>
      </Page>
    </SearchContextProvider>;
}
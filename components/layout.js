import React from 'react';
import {Menu,MenuMenu,MenuItem,Container} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Link } from '../routes';

const Layout = (props) =>
{
    return (
        <Container>
            <Menu style={{marginTop:'10px'}}>
        <Link route="/">
          <a className="item">
            CrowdCoin
          </a>
        </Link>

        <MenuMenu position='right'>
        <Link route="/">
          <a className="item">
            Campaign
          </a>
          </Link>  

          <Link route="/campaigns/new">
          <a className="item">
            +
          </a>
          </Link>  
        </MenuMenu>
      </Menu>
            { props.children}
        </Container>
    );
};

export default Layout;
import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { animateScroll as scroll, scroller } from 'react-scroll';
import styles from './nav-menu.module.css';
import { items } from '../../data/services';
import { useTranslation } from 'react-i18next';

const NavMenu = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

   useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleHomeClick = (event) => {
    if (location.pathname === '/') {
      event.preventDefault();
      scroll.scrollToTop({ duration: 800, smooth: 'easeInOutQuad' });
    }
  };

  const handleAnchorClick = (anchor) => (event) => {
    event.preventDefault();
    if (location.pathname === '/') {
      scroller.scrollTo(anchor.slice(1), {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuad',
        offset: -100,
      });
    } else {
      navigate(`/${anchor}`);
    }
  };

  const corporateServices = items.filter(item => item.type === 'corporate');
  const individualServices = items.filter(item => item.type === 'individual');

  const renderServiceCard = item => (
    <li className={styles.dropdownItem} key={item.id}>
      <NavLink className={styles.dropdownLink} to={`service/${item.address}`}>
        {t(`services.${item.name}.name`)}
      </NavLink>
    </li>
  );

  return (
    <div className={styles.mobile}>
      <ul className={styles.menu}>
        <li className={styles.item}>
          <NavLink className={styles.link} to="/">
            {t('header.navMenu.homePage')}
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink className={styles.link} to="services/individual">
            {t('header.navMenu.individualServices')}
          </NavLink>
          <ul className={`${styles.dropdown} ${styles.fadeIn}`}>
            {individualServices.map(renderServiceCard)}
          </ul>
        </li>
        <li className={styles.item}>
          <NavLink className={styles.link} to="services/corporate">
            {t('header.navMenu.corporateServices')}
          </NavLink>
          <ul className={`${styles.dropdown} ${styles.fadeIn}`}>
            {corporateServices.map(renderServiceCard)}
          </ul>
        </li>
        <li className={styles.item}>
          <NavLink className={styles.link} to="/about-us">
            {t('header.navMenu.aboutUs')}
          </NavLink>
        </li>
      </ul>
    </div>

  );
};

export { NavMenu };

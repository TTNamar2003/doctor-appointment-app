import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer';
import LandingPage from './components/LandingPage';
import styles  from '@/app/page.module.css'
import Login from './components/Login';
export default function Home() {
  return (
    <div className={styles.page_container}>
      
      {/* <Footer/> */}
      {/* <LandingPage/> */}
      <Login/>
    </div>
  );
}

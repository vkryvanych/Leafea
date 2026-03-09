import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from 'react';
import Header from '../Header/Header';
import './ScrollBackground.css';

import sky from '../../assets/sky.png';
import m_el1 from '../../assets/m_el1.png';
import m_el2 from '../../assets/m_el2.png';
import m_el3 from '../../assets/m_el3.png';

function ScrollBackground() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const ySky = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);  
    const yText = useTransform(scrollYProgress, [0, 1], ['0%', '90%']);
    const yMid = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);  
    const yClose = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
    const yBase = useTransform(scrollYProgress, [0, 1], ['0%', '0%']);
    
    const yHeader = useTransform(scrollYProgress, [0, 1], ['0vh', '100vh']);

    return (
        <div ref={ref} className='parallax-wrapper' style={{ overflow: 'hidden' }}>
            
            <motion.div style={{ y: yHeader, position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 3, pointerEvents: 'none' }}>
                <div style={{ pointerEvents: 'auto' }}>
                    <Header />
                </div>
            </motion.div>
          
            <motion.div style={{ y: yText, zIndex: 2 }} className="hero-content-overlay">
                <h1 className='leaf-text'>Leafea</h1>
                <p className="sub-text">Твоя рекомендаційна система</p>
                <button className="start-btn">Почати</button>
            </motion.div>
        
            <motion.div
                className="parallax-layer-sky"
                style={{ backgroundImage: `url(${sky})`, y: ySky, zIndex: 1 }}
            />

            <motion.div
                className="parallax-layer-mountains-1"
                style={{ backgroundImage: `url(${m_el1})`, y: yMid, zIndex: 3 }}
            />

            <motion.div
                className="parallax-layer-mountains-2"
                style={{ backgroundImage: `url(${m_el2})`, y: yClose, zIndex: 4 }}
            />

            <motion.div
                className="parallax-layer-mountains-3"
                style={{ backgroundImage: `url(${m_el3})`, y: yBase, zIndex: 5 }}
            />
        </div>
    );
}

export default ScrollBackground;
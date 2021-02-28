import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';
import {   Switch } from 'antd';
import SignOut from '../SignOut';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './index.css';




const Nav = () => {
  function main() {


/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/8.png');
const matcapTexture1 = textureLoader.load('/textures/matcaps/8.png');
/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader();
fontLoader.load(
   'fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
      
        const textGeometry = new THREE.TextGeometry(
            'Events World Wide',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
       
        textGeometry.center()

        const material = new THREE.MeshMatcapMaterial({ map:  matcapTexture });
        
        const text = new THREE.Mesh(textGeometry, material);
        
        scene.add(text);

            
    }
)
/**
 * Base
 */

// Canvas
const canvas = document.querySelector('#webgl');

 
// Scene
const scene = new THREE.Scene();

/**
Object */
const material = new THREE.MeshMatcapMaterial({ map: matcapTexture1 });

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    material
)
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2));
scene.add(sphere)
/**
 * Sizes
 */
const sizes = {
   /* width: window.innerWidth,
    height: window.innerHeight*/
    width: 300,
    height: 80
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(15, sizes.width / sizes.height, 0.1, 100);
//camera.position.x = 1
//camera.position.y = 1
camera.position.z = 11;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();
    sphere.position.x =  (  Math.PI * Math.cos(elapsedTime) );
  // sphere.rotation.y =  elapsedTime
     sphere.position.z =  (Math.PI * Math.sin(elapsedTime));
    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick()
}

const [user, setUser] = useState(null) 
  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser()
      const userInfo = { username: data.username, ...data.attributes }
      setUser(userInfo)
    } catch (err) { console.log('error: ', err) }
  }
 
  const displayAuth = () => {
       const auth = document.getElementsByClassName('auth')[0]  ;
       const un = document.getElementsByClassName('un')[0]  ;
        if(user) {
            auth.style.display='block';
            un.style.display='none';
          }
          
         
        }
   if(user) { 
     displayAuth()
     }
  useEffect(() => {
    main();
      checkUser()
            Hub.listen('auth', (data) => {
              const { payload } = data
              if (payload.event === 'signOut') {
                setUser(null)
              }
            })
    
  }, [])

    const [theme, setTheme] = useState(null);
 
  
   
    const dark = (value: any) => {

               setTheme(value  ? 'dark' : 'light');               
               const body = document.body;
               body.classList.toggle('dark');
               
       };

   
    
    return (
        <div className="nav">  
        <div className="brand-name">
                
                     
                      <canvas id="webgl"></canvas>
                 

                 <div className="authentification">

                    <div className="un authentificated">
                     <Link to="/authentification"> S'authentifier </Link >
                    </div>

                    <div className=" auth authentificated">
                    <SignOut user={user}/>
                    </div>
                 </div>
           </div>
           <div className="nav-onglet">
                 
                   <Switch className="switch"
                             onChange={dark}
                             checkedChildren="Dark"
                             unCheckedChildren="Light"
                   /> 

                   <Link to="/" className="accueil"> Accueil </Link>

          </div>
        </div>
    )
}

export default Nav;
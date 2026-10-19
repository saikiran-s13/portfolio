// Photorealistic 3D layer: Google Photorealistic 3D Tiles via 3d-tiles-renderer.
// Needs a bundler (Vite): npm i three 3d-tiles-renderer. Key must be referrer-restricted.
import*as THREE from 'three';
import{TilesRenderer}from '3d-tiles-renderer/three';
import{GoogleCloudAuthPlugin}from '3d-tiles-renderer/core/plugins';
const KEY=window.TILES_KEY;
if(KEY&&!KEY.startsWith('PASTE')){try{init()}catch(e){console.warn('[tiles] disabled',e)}}
function init(){
const R=Math.PI/180,A=6378137,E2=.00669437999014;
const ecef=(la,lo,h)=>{la*=R;lo*=R;const n=A/Math.sqrt(1-E2*Math.sin(la)**2);return new THREE.Vector3((n+h)*Math.cos(la)*Math.cos(lo),(n+h)*Math.cos(la)*Math.sin(lo),(n*(1-E2)+h)*Math.sin(la))};
// chapter k: [lat, lon, orbit radius m, camera height m (ellipsoidal), look-at height m, start deg, sweep deg, sky, fog]
// APPROXIMATE values: verify each landmark in Google Maps and tune heights on screen. Missing k = 2D fallback scene.
const P={1:[30.3216,35.4513,160,1060,930,200,50,'#9fc3e8',2e-4],2:[-13.1631,-72.545,520,2950,2450,300,60,'#bcd4e6',1.5e-4],3:[35.6586,139.7454,430,340,130,220,70,'#27316b',1e-4],4:[29.317,110.434,900,1950,1250,250,50,'#b9c8c2',3e-4],6:[40.634,14.6027,750,470,60,160,60,'#8cc4ee',1e-4],7:[-20.2506,44.4189,260,170,70,260,40,'#f2a26a',1.5e-4],9:[17.6868,83.2185,620,440,190,120,60,'#ffb08a',1.2e-4]};
const rd=new THREE.WebGLRenderer({canvas:document.getElementById('tl'),antialias:true,logarithmicDepthBuffer:true});
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(55,1,2,1e7);sc.add(new THREE.AmbientLight(0xffffff,1.6));
const tiles=new TilesRenderer();tiles.registerPlugin(new GoogleCloudAuthPlugin({apiToken:KEY,autoRefreshToken:true}));
tiles.errorTarget=14;sc.add(tiles.group);
const TL=window.TL={ok:false,has:k=>!!P[k],draw(k,o,T,s){const c=P[k],[la,lo,r,hc,hl,a0,sw,sk,fg]=c;
 const e=ecef(la,lo,hl),up=e.clone().normalize(),lr=la*R,lg=lo*R,ea=new THREE.Vector3(-Math.sin(lg),Math.cos(lg),0),no=new THREE.Vector3(-Math.sin(lr)*Math.cos(lg),-Math.sin(lr)*Math.sin(lg),Math.cos(lr)),a=(a0+o*sw+T*1.5)*R;
 cam.position.copy(e).addScaledVector(ea,Math.cos(a)*r).addScaledVector(no,Math.sin(a)*r).addScaledVector(up,hc-hl);cam.up.copy(up);cam.lookAt(e);
 sc.background=new THREE.Color(sk);sc.fog=new THREE.FogExp2(sk,fg);
 cam.updateMatrixWorld();tiles.setCamera(cam);tiles.setResolutionFromRenderer(cam,rd);tiles.update();rd.render(sc,cam);
 if(s>.3){try{const q=[];tiles.getAttributions(q);document.getElementById('attr').textContent='Google · '+q.filter(x=>x.type==='string').map(x=>x.value).join(' · ')}catch(_){document.getElementById('attr').textContent='Google'}}else document.getElementById('attr').textContent=''}};
tiles.addEventListener('load-model',()=>{TL.ok=true});
function rs(){rd.setPixelRatio(Math.min(devicePixelRatio,innerWidth<800?1.5:2));rd.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}
addEventListener('resize',rs);rs();
}

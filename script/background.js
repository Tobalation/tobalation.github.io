// Renderer setup
var canvas = document.querySelector("canvas");
var renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
renderer.setClearColor( 0x000000, 0 );

// Scene setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);
camera.position.z = 4.2;

// Detect browser theme initially to set material color
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    var material = new THREE.MeshBasicMaterial({ 
        color: 0x555555, 
        wireframe: true,
    });
} else {
    var material = new THREE.MeshBasicMaterial({ 
        color: 0xdddddd, 
        wireframe: true,
    });
}

// Setup scene objects
var icosphere = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 1), material);
scene.add(icosphere);

// Window resize handling
function resize() {
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    if (width != canvas.width || height != canvas.height) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    }
}

// Actual render loop
function render() {
    requestAnimationFrame(render);
    resize();

    // Rotate icosphere
    icosphere.rotation.x += 0.00035;
    icosphere.rotation.y += 0.0005;

    // Update colors if theme changes
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        icosphere.material.color.set(0x555555);
    } else {
        icosphere.material.color.set(0xdddddd);
    }

    renderer.render(scene, camera);
}

render();
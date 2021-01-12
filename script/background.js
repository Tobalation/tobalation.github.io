// Scene setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);

camera.position.z = 4.2;

var canvas = document.querySelector("canvas");
var renderer = new THREE.WebGLRenderer({canvas: canvas});

// Detect browser theme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    renderer.setClearColor(0x212121);
    var material = new THREE.MeshBasicMaterial({ 
        color: 0x555555, 
        wireframe: true,
    });
} else {
    renderer.setClearColor(0xfafefc);
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

    icosphere.rotation.x += 0.00035;
    icosphere.rotation.y += 0.0005;

    renderer.render(scene, camera);
}

render();
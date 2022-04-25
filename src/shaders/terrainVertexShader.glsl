varying float x;
varying float y;
varying float z;
varying vec3 vUv;
uniform float delta_time;
uniform float amplitude;
uniform float[64] data;

varying vec3 vPos;
varying vec3 vNormal;

void main() {
    vUv = position;
    x = abs(position.x);
    y = abs(position.y);
    float floor_x = (x);
    float floor_y = (y);
    float x_multiplier = (32.0 - x) / 8.0;
    float y_multiplier = (32.0 - y) / 8.0;
    // z = position.z;
    // z = abs(position.x) + abs(position.y);
    // z = sin(abs(position.x) + abs(position.y));
    // z = sin(abs(position.x) + abs(position.y) + delta_time * .005);
    z = sin(data[int(floor_x)] / 50.0 + data[int(floor_y)] / 50.0) * amplitude;

    vec3 newPosition = position + normal * z;
    vPos = (modelMatrix * vec4(newPosition, 1.0)).xyz;
    vNormal = normalMatrix * normal;
    // z = (data[int(floor_x)] / 50.0 + data[int(floor_y)] / 50.0) * 2.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
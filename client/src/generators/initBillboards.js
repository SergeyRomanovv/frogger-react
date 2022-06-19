import Billboard from "./Items/Billboard";

export default function  initBillboards (scene, zoom) {
    const billboard = new Billboard(zoom, 'Redux', '#B845F2', -60, 30)
    billboard.position.x = 21 * zoom * 9;
    billboard.position.y = 21 * zoom;

    const billboard2 = new Billboard(zoom, 'React', '#02B8E1', -60, 30)
    billboard2.position.x = 21 * zoom * -9;
    billboard2.position.y = (21 * zoom) + (84 * 5);

    const billboard3 = new Billboard(zoom, 'NodeJS', '#0E681B', -70, 30);
    billboard3.position.x = 21 * zoom * 9;
    billboard3.position.y = (21 * zoom) + (84 * 10);

    const billboard4 = new Billboard(zoom, 'PostgreSQL', '#1E76A7', -80, 22);
    billboard4.position.x = 21 * zoom * -9;
    billboard4.position.y = (21 * zoom) + (84 * 15);

    const billboard5 = new Billboard(zoom, 'ThreeJS', '#353535', -70, 27);
    billboard5.position.x = 21 * zoom * 9;
    billboard5.position.y = (21 * zoom) + (84 * 20);

    scene.add(billboard, billboard2, billboard3, billboard4, billboard5);
}
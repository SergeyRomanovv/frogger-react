import myReact from "./Texts/myReact"

export default function (scene, zoom, boardWidth) {
    const text = new myReact('Hi, my name is Anton Atangulov')
    text.position.z = 2
    text.position.x = (-boardWidth/2) * zoom + 100
    text.position.y = -200
    
    const text2 = new myReact('I am a frontend developer')
    text2.position.z = 2
    text2.position.x = (-boardWidth/2) * zoom + 400
    text2.position.y = -350
    
    const text3 = new myReact('Jump ahead to see my stack')
    text3.position.z = 2
    text3.position.x = (-boardWidth/2) * zoom + 100
    text3.position.y = -500
    
    scene.add(text, text2, text3)
}
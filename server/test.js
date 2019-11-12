const { Board, Expander, Sensor } = require("johnny-five");
const board = new Board();

board.on("ready", () => {
    const virtual = new Board.Virtual(
        new Expander("PCF8591")
    );

    const sensor = new Sensor({
        pin: "A0",
        board: virtual
    });

    sensor.on("change", value => {
        console.log("Sensor: ");
        console.log("  value  : ", sensor.value);
        console.log("-----------------");
    });
});

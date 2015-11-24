class Shape {
    constructor (data){
        this.ToolName   = data.toolName;
        this.LineColor  = data.lineColor;
        this.LineWidth  = data.lineWidth;
        this.LineCap    = data.lineCap;
        this.FillStyle  = data.fillStyle;
        this.isFilled   = data.filled;
        this.isStroked  = data.stroked;
        this.Points     = [];
    }
    /**
     *
     * @param point:int
     * @constructor
     */
    AddPoint(point){
        if (this.ToolName !== 'pencil' && this.Points.length > 1) {
            this.Points.pop();
        }
        this.Points.push(point)
    }
}

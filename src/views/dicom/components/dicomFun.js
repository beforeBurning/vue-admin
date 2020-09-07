/**
 Function: dicon的方法集合
 User: burning <923398776@qq.com>
 Date: 2020年08月31日
 */

import corn from "@/views/dicom/components/index";

// 创建canvas的盒子
export const enable = div => {
    corn.cornerstone.enable(div);
}

// 解析dicom
export const parser = (url, callback) => {
    corn.cornerstone.loadImage(url).then(image => {
        callback(image)
    }, err => {
        console.log('加载失败', err);
        callback(false);
    });
}

// 初始化canvas
export const getDefaultViewportForImage = (canvas, url) => {
    return corn.cornerstone.getDefaultViewportForImage(canvas, url);
}

// 显示图像
export const displayImage = (canvas, image, viewport) => {
    corn.cornerstone.displayImage(canvas, image, viewport);
}

// 刷新canvas
export const resize = canvas => {
    corn.cornerstone.resize(canvas, true);
}

// 工具栏
export const dicomTool = {
    // 开启鼠标控制
    init(canvas, allImageIds) {
        corn.cornerstoneTools.init({
            // 监听鼠标元素
            mouseEnabled: true,
            // 监听touch元素
            touchEnabled: true,
            globalToolSyncEnabled: false,
            showSVGCursors: false,
        });

        // 工具的颜色
        corn.cornerstoneTools.toolStyle.setToolWidth(1);
        corn.cornerstoneTools.toolColors.setToolColor('rgb(255, 0, 0)');
        corn.cornerstoneTools.toolColors.setActiveColor('rgb(0, 255, 0)');

        // 绑定元素
        corn.cornerstone.enable(canvas);

        // 添加工具
        this.addTool(canvas, allImageIds);

        // 比例工具
        const ScaleOverlayTool = corn.cornerstoneTools.ScaleOverlayTool;
        corn.cornerstoneTools.addTool(ScaleOverlayTool)
        corn.cornerstoneTools.setToolActive('ScaleOverlay', {mouseButtonMask: 1})
    },
    // 监听各个参数
    imageRenderedMonitoring(canvas, callback) {
        canvas.addEventListener('cornerstoneimagerendered', e => {
            const contextData = e.detail;
            const viewport = corn.cornerstone.getViewport(canvas);
            let zoomValue = viewport.scale.toFixed(3);
            let wwwcValue = Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter);
            let renderTime = contextData.renderTimeInMs.toFixed(3);
            callback({
                zoom: zoomValue,
                wwwc: wwwcValue,
                renderTime,
            })
        });
    },
    newImageMonitoring(canvas, callback) {
        canvas.addEventListener('cornerstonenewimage', e => {
            let toolData = corn.cornerstoneTools.getToolState(canvas, 'stack');
            let stack = toolData.data[0];
            callback({
                currentImageIdIndex: stack.currentImageIdIndex + 1,
                imageIds: stack.imageIds.length,
                frameRate: e.detail.frameRate
            })
        })
    },
    // 工具类注册
    addTool(canvas, allImageIds) {
        // 放大镜工具
        corn.cornerstoneTools.addTool(corn.cornerstoneTools.MagnifyTool, {
            configutarion: {
                magnifySize: 10,
                magnificationLevel: 5
            }
        })

        // 添加亮度调整工具
        corn.cornerstoneTools.addTool(corn.cornerstoneTools.WwwcTool)

        // 添加放大工具
        corn.cornerstoneTools.addTool(corn.cornerstoneTools.ZoomTool, {
            // Optional configuration
            configuration: {
                invert: false,
                preventZoomOutsideImage: false,
                minScale: .1,
                maxScale: 20.0,
            }
        });

        // 添加平移工具
        corn.cornerstoneTools.addTool(corn.cornerstoneTools.PanTool)

        // 添加堆叠工具
        corn.cornerstoneTools.addTool(corn.cornerstoneTools.StackScrollTool);
        corn.cornerstoneTools.addTool(corn.cornerstoneTools.StackScrollMouseWheelTool)
        corn.cornerstoneTools.addStackStateManager(canvas, ['stack'])
        corn.cornerstoneTools.addToolState(canvas, 'stack', {
            currentImageIdIndex: 0,
            imageIds: allImageIds
        })

        // 长度测量工具
        corn.cornerstoneTools.addTool(corn.cornerstoneTools.LengthTool);

        // 角度测量工具
        corn.cornerstoneTools.addTool(corn.cornerstoneTools.AngleTool)

        // 探针工具
        corn.cornerstoneTools.addTool(corn.cornerstoneTools.ProbeTool)

        // 橡皮擦工具
        corn.cornerstoneTools.addTool(corn.cornerstoneTools.EraserTool)

        // 矩形框
        corn.cornerstoneTools.addTool(corn.cornerstoneTools.RectangleRoiTool)

        // 矩形框
        corn.cornerstoneTools.addTool(corn.cornerstoneTools.EllipticalRoiTool)

        // 矩形框
        corn.cornerstoneTools.addTool(corn.cornerstoneTools.BidirectionalTool)
    },
    // 工具集合
    toolCollection(type) {
        // 亮度调整
        if (type === 'Wwwc') {
            corn.cornerstoneTools.setToolActive('Wwwc', {mouseButtonMask: 1})
        }
        if (type === 'Zoom') {
            corn.cornerstoneTools.setToolActive('Zoom', {mouseButtonMask: 1})
        }
        if (type === 'Pan') {
            corn.cornerstoneTools.setToolActive('Pan', {mouseButtonMask: 1})
        }
        if (type === 'StackScrollTool') {
            corn.cornerstoneTools.setToolActive('StackScroll', {mouseButtonMask: 1})
            // corn.cornerstoneTools.setToolActive('StackScrollMouseWheel', { })
        }
        if (type === 'Length') {
            corn.cornerstoneTools.setToolActive('Length', {mouseButtonMask: 1})
        }
        if (type === 'Angle') {
            corn.cornerstoneTools.setToolActive('Angle', {mouseButtonMask: 1})
        }
        if (type === 'Probe') {
            corn.cornerstoneTools.setToolActive('Probe', {mouseButtonMask: 1})
        }
        if (type === 'Eraser') {
            corn.cornerstoneTools.setToolActive('Eraser', {mouseButtonMask: 1})
        }
        if (type === 'Magnify') {
            corn.cornerstoneTools.setToolActive('Magnify', {mouseButtonMask: 1})
        }
        if (type === 'RectangleRoi') {
            corn.cornerstoneTools.setToolActive('RectangleRoi', {mouseButtonMask: 1})
        }
        if (type === 'EllipticalRoi') {
            corn.cornerstoneTools.setToolActive('EllipticalRoi', {mouseButtonMask: 1})
        }
        if (type === 'Bidirectional') {
            corn.cornerstoneTools.setToolActive('Bidirectional', {mouseButtonMask: 1})
        }
    },
    // 禁用所有工具
    disableAllTools() {
        corn.cornerstoneTools.setToolEnabled('Wwwc')
        corn.cornerstoneTools.setToolEnabled('Zoom')
        corn.cornerstoneTools.setToolEnabled('Pan')
        corn.cornerstoneTools.setToolEnabled('StackScroll')
        corn.cornerstoneTools.setToolEnabled('Length')
        corn.cornerstoneTools.setToolEnabled('Angle')
        corn.cornerstoneTools.setToolEnabled('Probe')
        corn.cornerstoneTools.setToolEnabled('Eraser')
        corn.cornerstoneTools.setToolEnabled('Magnify')
        corn.cornerstoneTools.setToolEnabled('RectangleRoi')
        corn.cornerstoneTools.setToolEnabled('EllipticalRoi')
        corn.cornerstoneTools.setToolEnabled('Bidirectional')
    },
    // 保存按钮
    getToolState(canvas) {
        let Length = corn.cornerstoneTools.getToolState(canvas, 'Length')
        let Angle = corn.cornerstoneTools.getToolState(canvas, 'Angle')
        let Probe = corn.cornerstoneTools.getToolState(canvas, 'Probe')
        let RectangleRoi = corn.cornerstoneTools.getToolState(canvas, 'RectangleRoi')
        let EllipticalRoi = corn.cornerstoneTools.getToolState(canvas, 'EllipticalRoi')
        let Bidirectional = corn.cornerstoneTools.getToolState(canvas, 'Bidirectional')
        return {
            Length,
            Angle,
            Probe,
            RectangleRoi,
            EllipticalRoi,
            Bidirectional
        }
    }
}

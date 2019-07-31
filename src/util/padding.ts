import { View } from '@antv/g2';
import { Element, BBox } from '@antv/g';
import * as _ from '@antv/util';

interface DataPointType {
  [k: string]: any;
}

export default function getAutoPadding(view: View, components, defaultPadding) {
  const viewRange = view.get('viewRange');
  const { width, height, minX, maxX, minY, maxY } = viewRange;
  /*const width = view.get('width');
  const height = view.get('height');
  const width = viewRange.width;
  const height = viewRange.height;*/
  /** 参与auto padding的components: axis annotation legend*/
  const components_bbox = [ view.get('panelRange') ];
  getAxis(view, components_bbox);
  let box = mergeBBox(components_bbox);

  getLegend(view, components_bbox, box);
  /**参与auto padding的自定义组件 */
  _.each(components, (obj) => {
    const component = obj as Element;
    const bbox = component.getBBox();
    components_bbox.push(bbox);
  });
  box = mergeBBox(components_bbox);
  /** 极坐标下padding计算错误问题 */
  if (box.minY === viewRange.minY) box.minY = 0;
  const padding = [
    0 - box.minY + defaultPadding[0], // 上面超出的部分
    box.maxX - maxX + defaultPadding[1], // 右边超出的部分
    box.maxY - maxY + defaultPadding[2], // 下边超出的部分
    0 - box.minX + defaultPadding[3],
  ];
  return padding;

}

function getAxis(view, bboxes) {
  const axes = view.get('axisController').axes;
  if (axes.length > 0) {
    _.each(axes, (a) => {
      const axis = a as DataPointType;
      const bbox = axis.get('group').getBBox();
      bboxes.push(bbox);
    });
  }
}

function getLegend(view, bboxes, box) {
  const viewRange = view.get('viewRange');
  const legends = view.get('legendController').legends;
  if (legends.length > 0) {
    _.each(legends, (l) => {
      const legend = l as DataPointType;
      const width = legend.getWidth();
      const height = legend.getHeight();
      adjustLegend(legend, view, box);
      const legendBBox = legend.get('container').getBBox();
      let x = 0;
      let y = 0;
      const position = legend.get('position').split('-');
      if (position[0] === 'right') {
        x = viewRange.maxX;
        y = legendBBox.minY;
      }
      if (position[0] === 'left') {
        x = viewRange.minX - width;
        y = legendBBox.minY;
      }
      if (position[0] === 'top') {
        x = legendBBox.minX;
        y = - height;
      }
      if (position[0] === 'bottom') {
        x = legendBBox.minX;
        y = viewRange.maxY + height;
      }
      const bbox = new BBox(x, y, width, height);
      bboxes.push(bbox);
    });
  }
}

function mergeBBox(bboxes) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = - Infinity;
  _.each(bboxes, (bbox) => {
    const box = bbox as DataPointType;
    minX = Math.min(box.minX, minX);
    maxX = Math.max(box.maxX, maxX);
    minY = Math.min(box.minY, minY);
    maxY = Math.max(box.maxY, maxY);
  });
  /*if (Math.abs(minX) > width / 2) minX = 0;
  if (Math.abs(maxX) < width / 2) maxX = width;
  if (Math.abs(minY) > height / 2) minY = 0;
  if (Math.abs(maxY) < height / 2) maxY = height;*/
  return { minX, maxX, minY, maxY };
}

function adjustLegend(legend, view, box) {
  const position = legend.get('position').split('-');
  const container = legend.get('container');
  const bbox = container.getBBox();
  const { width, height, maxX, minX, maxY, minY } = view.get('viewRange');
  if (position[0] === 'right') container.move(width, minY);
  if (position[0] === 'left') container.move(box.minX - bbox.width, minY);
  if (position[0] === 'top') container.move(0, box.minY - bbox.height);
  if (position[0] === 'bottom') container.move(0, Math.max(maxY, box.maxY));
}

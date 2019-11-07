import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { getGeom } from '../../geoms/factory';
import TinyLayer, { TinyLayerConfig } from '../tiny-layer';
import * as EventParser from './event';

const GEOM_MAP = {
  line: 'line',
};

export interface TinyLineLayerConfig extends TinyLayerConfig {}

export default class TinyLineLayer extends TinyLayer {
  public line: any;
  public type: string = 'tinyLine';

  protected geometryParser(dim: string, type: string): string {
    return GEOM_MAP[type];
  }

  protected addGeometry() {
    this.line = getGeom('line', 'mini', {
      plot: this,
    });
    this.setConfig('element', this.line);
  }

  protected parserEvents(eventParser) {
    super.parserEvents(EventParser);
  }
}

registerPlotType('tinyLine', TinyLineLayer);
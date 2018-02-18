import { Rect2, Vec2 } from '@app/core'

import {
    Configurable,
    DiagramShape,
    SelectionConfigurable,
    TextHeightConstraint
} from '@app/wireframes/model';

import { AbstractControl, AbstractContext } from './utils/abstract-control';

const STATE_KEY = 'STATE';
const STATE_NORMAL = 'Normal';
const STATE_CHECKED = 'Checked';
const CIRCLE_MARGIN = 4;
const CIRCLE_RADIUS = 9;
const CIRCLE_POSITION_X = CIRCLE_MARGIN + CIRCLE_RADIUS;
const CIRCLE_CHECK_RADIUS = CIRCLE_RADIUS - 4;
const TEXT_POSITION_X = 2 * CIRCLE_MARGIN + 2 * CIRCLE_RADIUS;

const DEFAULT_APPEARANCE = {};
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_FOREGROUND_COLOR] = AbstractControl.CONTROL_TEXT_COLOR;
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_BACKGROUND_COLOR] = AbstractControl.CONTROL_BACKGROUND_COLOR;
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_TEXT] = 'RadioButton';
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_TEXT_ALIGNMENT] = 'left';
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_FONT_SIZE] = AbstractControl.CONTROL_FONT_SIZE;
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_STROKE_COLOR] = AbstractControl.CONTROL_BORDER_COLOR;
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_STROKE_THICKNESS] = AbstractControl.CONTROL_BORDER_THICKNESS;
DEFAULT_APPEARANCE[STATE_KEY] = STATE_NORMAL;

const CONFIGURABLES: Configurable[] = [
    new SelectionConfigurable(STATE_KEY, 'State',
        [
            STATE_NORMAL,
            STATE_CHECKED
        ])
];

const CONSTRAINT = new TextHeightConstraint(8);

export class RadioButton extends AbstractControl {
    public identifier(): string {
        return 'RadioButton';
    }

    public createDefaultShape(shapeId: string): DiagramShape {
        return DiagramShape.createShape(this.identifier(), 130, 36, CONFIGURABLES, DEFAULT_APPEARANCE, shapeId, CONSTRAINT);
    }

    protected renderInternal(ctx: AbstractContext) {
        this.createCircle(ctx);
        this.createText(ctx);
    }

    private createCircle(ctx: AbstractContext) {
        const y = 0.5 * ctx.bounds.size.y;

        const circleItem = ctx.renderer.createCircle(new Vec2(CIRCLE_POSITION_X, y), ctx.shape, CIRCLE_RADIUS);

        ctx.renderer.setStrokeColor(circleItem, ctx.shape);
        ctx.renderer.setBackgroundColor(circleItem, ctx.shape);

        ctx.add(circleItem);

        const state = ctx.shape.appearance.get(STATE_KEY);

        if (state === STATE_CHECKED) {
            const checkCircleItem = ctx.renderer.createCircle(new Vec2(CIRCLE_POSITION_X, y), 0, CIRCLE_CHECK_RADIUS);

            ctx.renderer.setBackgroundColor(checkCircleItem, ctx.shape.appearance.get(DiagramShape.APPEARANCE_STROKE_COLOR));

            ctx.add(checkCircleItem);
        }
    }

    private createText(ctx: AbstractContext) {
        const w = ctx.shape.transform.size.x - TEXT_POSITION_X;
        const h = ctx.shape.transform.size.y;

        const textItem = ctx.renderer.createSinglelineText(new Rect2(new Vec2(TEXT_POSITION_X, 0), new Vec2(w, h)), ctx.shape);

        ctx.add(textItem);
    }
}
/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { texts } from '@app/texts';
import { setZoom, useStore } from '@app/wireframes/model';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { UIAction } from './shared';

export function useUI() {
    const dispatch = useDispatch();
    const zoom = useStore(x => x.ui.zoom);
    const canZoomIn = zoom < 2;
    const canZoomOut = zoom > 0.25;

    const doZoomOut = React.useCallback(() => {
        dispatch(setZoom(zoom - 0.25));
    }, [dispatch, zoom]);

    const doZoomIn = React.useCallback(() => {
        dispatch(setZoom(zoom + 0.25));
    }, [dispatch, zoom]);

    const zoomOut: UIAction = React.useMemo(() => ({
        disabled: !canZoomOut,
        icon: <MinusCircleOutlined />,
        label: texts.common.zoomOut,
        shortcut: 'ALT + MINUS',
        tooltip: texts.common.zoomOut,
        onAction: doZoomOut,
    }), [canZoomOut, doZoomOut]);

    const zoomIn: UIAction = React.useMemo(() => ({
        disabled: !canZoomIn,
        icon: <PlusCircleOutlined />,
        label: texts.common.zoomIn,
        shortcut: 'ALT + PLUS',
        tooltip: texts.common.zoomIn,
        onAction: doZoomIn,
    }), [canZoomIn, doZoomIn]);

    return { zoomOut, zoomIn };
}

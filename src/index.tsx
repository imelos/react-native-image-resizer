import { NativeModules, Platform } from 'react-native';
import type { Options, ResizeFormat, Response } from './types';
export type { ResizeFormat, ResizeMode, Response } from './types';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const ImageResizer = isTurboModuleEnabled
  ? require('./NativeImageResizer').default
  : NativeModules.ImageResizer;

const defaultOptions: Options = {
  mode: 'contain',
  onlyScaleDown: false,
};

function createResizedImage(
  uri: string,
  width: number,
  height: number,
  format: ResizeFormat,
  quality: number,
  rotation: number = 0,
  flipHorizontal: boolean,
  outputPath?: string | null,
  keepMeta = false,
  options: Options = defaultOptions
): Promise<Response> {
  const { mode, onlyScaleDown } = { ...defaultOptions, ...options };
 if ( Platform.OS === 'ios') {
  return ImageResizer.createResizedImage(
    uri,
    width,
    height,
    format,
    quality,
    mode,
    onlyScaleDown,
    rotation,
    flipHorizontal,
    outputPath,
    keepMeta
  ) 
 } 
  return ImageResizer.createResizedImage(
    uri,
    width,
    height,
    format,
    quality,
    mode,
    onlyScaleDown,
    rotation,
    outputPath,
    keepMeta
  );
}

export default {
  createResizedImage,
};

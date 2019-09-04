import { EventEmitter } from 'events'

import {
  home,
  library,
  settings,
  profile,
  authentication
} from '../models/slideshow-items'

import { Home } from '../ui/home'
import { Library } from '../ui/library'
import { Settings } from '../ui/settings'

export const slideshowController = new SlideshowController()

class SlideshowController extends EventEmitter {
  constructor () {
    this.slideshowItems = slideshowItems
  }
}
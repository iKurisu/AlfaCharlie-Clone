import React, { useRef, MouseEventHandler, RefObject } from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState } from "store";
import { menuActions } from "modules/menu";
import { heroActions } from "modules/hero";
import { testimonialsActions } from "modules/testimonials";
import Mask from "./slider/Mask";
import Slide from "./slider/Slide";
import useDrag, { Handler } from "hooks/useDrag";
import { getDistance, getDuration } from "utils/slider";
import { setTransform, setTransition } from "utils/refs";
import "./Slider.scss";

interface MappedState {
  isOpen: boolean;
  currentSlideID: number;
  previousSlideID: number;
}

interface MappedActions {
  swipeSlide: (elementID: number, duration: number) => MouseEventHandler;
}

interface SliderOptions {
  fadeDirection: "left" | "right";
  width: {
    image: number;
    wrapper: number;
  };
  delay?: number;
  maxLength?: number;
}

interface OwnProps {
  imageUrls: string[];
  options: SliderOptions;
}

export type Props = MappedState & MappedActions & OwnProps;

interface Properties {
  transform?: (id: number) => string;
  transition?: string;
}

enum MouseDirection {
  LEFT = 1,
  RIGHT = -1
}

export const Slider = ({
  imageUrls,
  options: { fadeDirection, delay = 0, width, maxLength = 3000 },
  isOpen,
  currentSlideID,
  previousSlideID,
  swipeSlide
}: Props): JSX.Element => {
  const wrapper = useRef(null);
  const images = imageUrls.map(() => useRef(null));

  const wrapperDistance = currentSlideID * -width.wrapper;
  const getSlideDistance = (id: number): number =>
    1 - width.image * (id - currentSlideID);

  const setWrapperTransform = setTransform(wrapper);
  const setWrapperTransition = setTransition(wrapper);

  const updateProperties = ({ transform, transition }: Properties) => (
    image: RefObject<HTMLDivElement>,
    id: number
  ) => {
    if (transform) setTransform(image)(transform(id));
    if (transition) setTransition(image)(transition);
  };

  const onTransition = useRef(false);

  const toggleTransition = (): void => {
    onTransition.current = true;
    setTimeout(() => (onTransition.current = false), 1000);
  };

  const isOnTransition = (): boolean => onTransition.current;

  const isFirstSlide = (mouseX: number, clickPosition: number): boolean =>
    currentSlideID === 0 && mouseX > clickPosition;
  const isLastSlide = (mouseX: number, clickPosition: number): boolean =>
    currentSlideID === 4 && mouseX < clickPosition;

  const isAtExtreme: typeof isFirstSlide = (...args) =>
    isFirstSlide(...args) || isLastSlide(...args);

  const canSwipe: typeof isFirstSlide = (...args) =>
    !isAtExtreme(...args) && !isOnTransition();

  const onDrag: Handler = (event, clickPosition) => {
    if (!canSwipe(event.clientX, clickPosition)) return;

    setWrapperTransform(
      `translateX(${wrapperDistance + event.clientX - clickPosition}px)`
    );

    images.forEach(
      updateProperties({
        transform: (id: number): string => {
          return `translateX(${1 -
            width.image *
              (id - (clickPosition - event.clientX) / width.wrapper) +
            width.image * currentSlideID}px)`;
        }
      })
    );
  };

  const onDrop: Handler = (event, clickPosition) => {
    if (!canSwipe(event.clientX, clickPosition)) return;

    if (getDistance(event.clientX, clickPosition) < width.wrapper * 0.2) {
      toggleTransition();

      setWrapperTransform(`translateX(${wrapperDistance}px)`);
      setWrapperTransition("transform 1s");

      images.forEach(
        updateProperties({
          transform: (id: number): string =>
            `translateX(${getSlideDistance(id)}px)`,
          transition: "transform 1s"
        })
      );

      setTimeout(() => {
        setWrapperTransition("transform 0s");

        images.forEach(updateProperties({ transition: "transform 0s" }));
      }, 1000);
    } else {
      const direction =
        event.clientX < clickPosition
          ? MouseDirection.LEFT
          : MouseDirection.RIGHT;

      const duration = getDuration({
        from: currentSlideID,
        to: currentSlideID + direction,
        max: maxLength
      });

      toggleTransition();
      swipeSlide(currentSlideID + direction, duration)(event);
    }
  };

  const dragProps = useDrag({ onDrag, onDrop });

  const transitionDuration = getDuration({
    from: previousSlideID,
    to: currentSlideID,
    max: maxLength
  });

  return (
    <React.Fragment>
      <Mask isOpen={isOpen} options={{ fadeDirection, delay }} />
      <div className="slider-swiper" {...dragProps}>
        <div
          className="slider-wrapper"
          ref={wrapper}
          style={{
            transform: `translateX(${wrapperDistance.toFixed(3)}px)`,
            transition: `transform ${transitionDuration}ms`
          }}
        >
          {imageUrls.map(
            (url, id): JSX.Element => (
              <Slide
                url={url}
                distance={getSlideDistance(id)}
                duration={transitionDuration}
                imageRef={images[id]}
                key={id}
              />
            )
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

interface Actions<T> {
  setSlide: (slideID: number) => T;
  updatePreviousSlide: () => T;
}

const swipeSlide = <T extends AnyAction>(
  dispatch: Dispatch,
  actions: Actions<T>
) => (
  elementID: number,
  duration: number
): React.MouseEventHandler => (): void => {
  dispatch(actions.setSlide(elementID));
  setTimeout(() => dispatch(actions.updatePreviousSlide()), duration);
};

const mapMenuState = ({ menu }: AppState): MappedState => ({
  isOpen: menu.toggled,
  currentSlideID: menu.hoveringElementID,
  previousSlideID: menu.previousElementID
});

const mapMenuDispatch = (dispatch: Dispatch): MappedActions => ({
  swipeSlide: swipeSlide(dispatch, menuActions)
});

export const MenuSlider = connect(mapMenuState, mapMenuDispatch)(Slider);

const mapHeroState = ({ hero, intro }: AppState): MappedState => ({
  isOpen: !intro.toggled,
  currentSlideID: hero.currentSlideID,
  previousSlideID: hero.previousSlideID
});

const mapHeroDispatch = (dispatch: Dispatch): MappedActions => ({
  swipeSlide: swipeSlide(dispatch, heroActions)
});

export const HeroSlider = connect(mapHeroState, mapHeroDispatch)(Slider);

const mapTestimonialsState = ({
  intro,
  testimonials
}: AppState): MappedState => ({
  isOpen: !intro.toggled,
  currentSlideID: testimonials.currentSlideID,
  previousSlideID: testimonials.previousSlideID
});

const mapTestimonialsDispatch = (dispatch: Dispatch): MappedActions => ({
  swipeSlide: swipeSlide(dispatch, testimonialsActions)
});

export const TestimonialsSlider = connect(
  mapTestimonialsState,
  mapTestimonialsDispatch
)(Slider);

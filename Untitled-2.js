class FrontendEngineer {}

class JuejinFrontendEnginnerSpecification implements Specification {
  isSatisfiedBy(person) {
    return person.isInteresting() && person.canWriteBUG();
  }
}

class JuejinFrontendEnginner extends FrontendEngineer {
  constructor(person) {
    super(person);
    this.thingList = [
      "ES6+",
      "Node.js v8+",
      "Vue.js v2.4+",
      "SSR",
      "Chrome (Extension|Headless)",
      "Weixin",
      "Docker",
      "rm -rf /",
      "escape"
    ];
  }
  doSomeInterestingThings() {
    this.thingList.forEach(this.tryToPlay.bind(this));
  }
}
class BUG extends Error {
  constructor(msg) {
    super(msg);
    this.name = "BUG";
  }
}
class Me extends FrontendEngineer {
  isInteresting() {
    return 0.1 + 0.2 !== 0.3;
  }
  canWriteBUG() {
    try {
      throw new BUG("make a bug");
    } catch (error) {
      return true;
    }
  }
}
const me = new Me();
const juejinFrontendEnginnerSpecification = new JuejinFrontendEnginnerSpecification();

if (juejinFrontendEnginnerSpecification.isSatisfiedBy(me)) {
  new JuejinFrontendEnginner(me).doSomeInterestingThings();
}

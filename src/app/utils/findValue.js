export default function getValue(name, object) {
  return name in object ? object.getAttribute(name) : 'You have not added this information';
}

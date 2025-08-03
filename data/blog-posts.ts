import { BlogPost } from '@/types'

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Building Responsive Flutter Apps: Best Practices',
    excerpt: 'Learn responsive design patterns for Flutter applications with practical examples and proven techniques.',
    content: `# Building Responsive Flutter Apps: Best Practices

Creating responsive Flutter applications is crucial in today's multi-device world. Here are the key strategies I've learned from building dozens of Flutter apps.

## Use MediaQuery Wisely

MediaQuery is your best friend when building responsive layouts:

\`\`\`dart
Widget build(BuildContext context) {
  final screenWidth = MediaQuery.of(context).size.width;
  final isTablet = screenWidth > 600;
  
  return Container(
    padding: EdgeInsets.symmetric(
      horizontal: isTablet ? 32.0 : 16.0,
    ),
    child: // Your widget tree
  );
}
\`\`\`

## LayoutBuilder for Dynamic Sizing

LayoutBuilder provides more granular control over responsive design:

\`\`\`dart
LayoutBuilder(
  builder: (context, constraints) {
    if (constraints.maxWidth > 600) {
      return Row(
        children: [Sidebar(), MainContent()],
      );
    } else {
      return Column(
        children: [TopBar(), MainContent()],
      );
    }
  },
)
\`\`\`

## Flexible and Expanded Widgets

Use Flexible and Expanded for proportional sizing:

\`\`\`dart
Row(
  children: [
    Expanded(
      flex: 2,
      child: MainContent(),
    ),
    Expanded(
      flex: 1,
      child: Sidebar(),
    ),
  ],
)
\`\`\`

## Responsive Text Sizing

Implement responsive typography:

\`\`\`dart
Text(
  'Hello World',
  style: TextStyle(
    fontSize: MediaQuery.of(context).size.width > 600 ? 24 : 18,
    fontWeight: FontWeight.bold,
  ),
)
\`\`\`

## Testing Responsive Design

Always test on multiple screen sizes and orientations. Use Flutter's device simulator or physical devices to ensure your app looks great everywhere.

## Conclusion

Responsive design in Flutter is about using the right combination of MediaQuery, LayoutBuilder, and flexible widgets. With these tools, you can create apps that work beautifully on any screen size.`,
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Flutter',
    tags: ['Flutter', 'Responsive Design', 'Mobile Development'],
    author: 'Samandar Rajabboyev',
    slug: 'building-responsive-flutter-apps'
  },
  {
    id: 2,
    title: 'State Management in Flutter: Complete Guide',
    excerpt: 'Exploring Provider, Riverpod, and Bloc patterns with real-world implementation examples.',
    content: `# State Management in Flutter: Complete Guide

State management is one of the most important concepts in Flutter development. Let's explore the different approaches and when to use each one.

## Provider Pattern

Provider is the recommended state management solution for most Flutter apps:

\`\`\`dart
class CounterProvider extends ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
}
\`\`\`

## Riverpod

Riverpod is the next generation of Provider with compile-time safety:

\`\`\`dart
final counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {
  return CounterNotifier();
});

class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);

  void increment() => state++;
}
\`\`\`

## Bloc Pattern

For complex applications, consider using the BLoC pattern:

\`\`\`dart
abstract class CounterEvent {}

class IncrementEvent extends CounterEvent {}

class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<IncrementEvent>((event, emit) {
      emit(state + 1);
    });
  }
}
\`\`\`

## When to Use Each Approach

- **Provider**: Simple apps, local state
- **Riverpod**: Medium complexity, type safety needed
- **Bloc**: Complex apps, multiple features
- **GetX**: Quick prototypes, simple state

## Best Practices

1. Keep state as close to where it's used as possible
2. Use immutable state objects
3. Separate business logic from UI
4. Test your state management logic
5. Document your state structure

## Conclusion

Choose the right state management solution based on your app's complexity and team's expertise. Start simple and evolve as needed.`,
    date: '2024-01-10',
    readTime: '8 min read',
    category: 'Flutter',
    tags: ['Flutter', 'State Management', 'Provider', 'Riverpod'],
    author: 'Samandar Rajabboyev',
    slug: 'state-management-flutter-guide'
  },
  {
    id: 3,
    title: 'Flutter Performance Optimization Tips',
    excerpt: 'Discover proven techniques to make your Flutter apps faster and more efficient with practical examples and benchmarks.',
    content: `# Flutter Performance Optimization Tips

Performance is crucial for user experience. Here are proven techniques to optimize your Flutter apps.

## Use const Constructors

Always use const constructors when possible:

\`\`\`dart
// Good
const Text('Hello', style: TextStyle(fontSize: 16))

// Avoid
Text('Hello', style: TextStyle(fontSize: 16))
\`\`\`

## Optimize List Views

Use ListView.builder for large lists:

\`\`\`dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(items[index].title),
    );
  },
)
\`\`\`

## Image Optimization

Optimize images for better performance:

\`\`\`dart
Image.asset(
  'assets/image.jpg',
  width: 200,
  height: 200,
  fit: BoxFit.cover,
  cacheWidth: 400, // Optimize memory usage
  cacheHeight: 400,
)
\`\`\`

## Avoid setState in Loops

Don't call setState in loops or frequently:

\`\`\`dart
// Bad
for (int i = 0; i < 1000; i++) {
  setState(() {
    counter++;
  });
}

// Good
setState(() {
  counter += 1000;
});
\`\`\`

## Use RepaintBoundary

Isolate expensive widgets:

\`\`\`dart
RepaintBoundary(
  child: ExpensiveWidget(),
)
\`\`\`

## Profile Your App

Use Flutter DevTools to identify performance bottlenecks:

1. Run flutter run --profile
2. Open DevTools
3. Check Performance tab
4. Look for frame drops and slow widgets

## Memory Management

Dispose of controllers and listeners:

\`\`\`dart
class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
\`\`\`

## Conclusion

Performance optimization is an ongoing process. Profile regularly and optimize based on real-world usage patterns.`,
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Performance',
    tags: ['Flutter', 'Performance', 'Optimization'],
    author: 'Samandar Rajabboyev',
    slug: 'flutter-performance-optimization'
  },
  {
    id: 4,
    title: 'Flutter vs React Native: A Comprehensive Comparison',
    excerpt: 'Detailed analysis of both frameworks, their pros and cons, and when to choose each one for your mobile development projects.',
    content: `# Flutter vs React Native: A Comprehensive Comparison

When choosing a cross-platform mobile development framework, Flutter and React Native are the two most popular options. Let's compare them in detail.

## Performance

**Flutter**: Compiles to native code, resulting in better performance
**React Native**: Uses JavaScript bridge, which can cause performance bottlenecks

## Development Experience

**Flutter**: 
- Hot reload for instant feedback
- Single codebase for both platforms
- Rich set of pre-built widgets

**React Native**:
- Familiar JavaScript/React ecosystem
- Large community and third-party libraries
- Web developers can easily transition

## UI Consistency

**Flutter**: Material Design and Cupertino widgets ensure consistent UI
**React Native**: Platform-specific components may look different

## Learning Curve

**Flutter**: Requires learning Dart language
**React Native**: Uses familiar JavaScript/React

## Conclusion

Choose Flutter for performance-critical apps, React Native for rapid prototyping with existing web skills.`,
    date: '2024-01-03',
    readTime: '10 min read',
    category: 'Comparison',
    tags: ['Flutter', 'React Native', 'Mobile Development'],
    author: 'Samandar Rajabboyev',
    slug: 'flutter-vs-react-native'
  },
  {
    id: 5,
    title: 'Testing Strategies for Flutter Applications',
    excerpt: 'Comprehensive guide to unit testing, widget testing, and integration testing in Flutter with practical examples.',
    content: `# Testing Strategies for Flutter Applications

Testing is crucial for maintaining code quality and preventing regressions. Here's a comprehensive guide to testing in Flutter.

## Unit Testing

Test individual functions and classes:

\`\`\`dart
void main() {
  group('Counter', () {
    test('should increment counter', () {
      final counter = Counter();
      counter.increment();
      expect(counter.value, 1);
    });
  });
}
\`\`\`

## Widget Testing

Test UI components:

\`\`\`dart
testWidgets('Counter increments smoke test', (WidgetTester tester) async {
  await tester.pumpWidget(MyApp());
  expect(find.text('0'), findsOneWidget);
  await tester.tap(find.byIcon(Icons.add));
  await tester.pump();
  expect(find.text('1'), findsOneWidget);
});
\`\`\`

## Integration Testing

Test the entire app:

\`\`\`dart
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('end-to-end test', () {
    testWidgets('tap on the floating action button, verify counter',
        (tester) async {
      app.main();
      await tester.pumpAndSettle();
      expect(find.text('0'), findsOneWidget);
      await tester.tap(find.byTooltip('Increment'));
      await tester.pumpAndSettle();
      expect(find.text('1'), findsOneWidget);
    });
  });
}
\`\`\`

## Best Practices

1. Write tests for critical business logic
2. Use meaningful test names
3. Keep tests independent
4. Mock external dependencies
5. Test edge cases

## Conclusion

A comprehensive testing strategy ensures your Flutter app is reliable and maintainable.`,
    date: '2023-12-28',
    readTime: '7 min read',
    category: 'Testing',
    tags: ['Flutter', 'Testing', 'Quality Assurance'],
    author: 'Samandar Rajabboyev',
    slug: 'testing-strategies-flutter'
  },
  {
    id: 6,
    title: 'Designing Beautiful Flutter UIs: Best Practices',
    excerpt: 'Learn the principles of great UI design in Flutter, from color theory to layout patterns and user experience optimization.',
    content: `# Designing Beautiful Flutter UIs: Best Practices

Creating beautiful and functional user interfaces in Flutter requires understanding design principles and Flutter's widget system.

## Color Theory

Use consistent color schemes:

\`\`\`dart
class AppColors {
  static const primary = Color(0xFF2196F3);
  static const secondary = Color(0xFF03DAC6);
  static const background = Color(0xFFF5F5F5);
  static const surface = Color(0xFFFFFFFF);
  static const error = Color(0xFFB00020);
}
\`\`\`

## Typography

Implement consistent text styles:

\`\`\`dart
class AppTextStyles {
  static const headline1 = TextStyle(
    fontSize: 96,
    fontWeight: FontWeight.w300,
    letterSpacing: -1.5,
  );
  
  static const body1 = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w400,
    letterSpacing: 0.5,
  );
}
\`\`\`

## Layout Patterns

Use proper layout widgets:

\`\`\`dart
Scaffold(
  appBar: AppBar(title: Text('My App')),
  body: Column(
    children: [
      Expanded(
        child: ListView.builder(
          itemCount: items.length,
          itemBuilder: (context, index) => ListTile(
            title: Text(items[index].title),
          ),
        ),
      ),
    ],
  ),
)
\`\`\`

## Accessibility

Make your app accessible:

\`\`\`dart
Semantics(
  label: 'Increment button',
  child: FloatingActionButton(
    onPressed: () => counter.increment(),
    child: Icon(Icons.add),
  ),
)
\`\`\`

## Conclusion

Great UI design combines aesthetics with functionality. Follow Material Design guidelines and test with real users.`,
    date: '2023-12-20',
    readTime: '9 min read',
    category: 'UI/UX',
    tags: ['Flutter', 'UI/UX', 'Design'],
    author: 'Samandar Rajabboyev',
    slug: 'designing-beautiful-flutter-uis'
  }
] 
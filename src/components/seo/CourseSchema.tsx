'use client';

interface CourseItem {
  name: string;
  description: string;
}

interface CourseSchemaProps {
  name: string;
  description: string;
  provider: string;
  lessons?: CourseItem[];
}

export function CourseSchema({ name, description, provider, lessons }: CourseSchemaProps) {
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    educationalLevel: 'Beginner',
    isAccessibleForFree: true,
  };

  if (lessons && lessons.length > 0) {
    jsonLd.hasCourseInstance = lessons.map((lesson, index) => ({
      '@type': 'CourseInstance',
      name: lesson.name,
      description: lesson.description,
      courseMode: 'online',
      position: index + 1,
    }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
